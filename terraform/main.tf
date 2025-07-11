provider "aws" {
  region = "us-west-2"
}

# S3 Bucket for website assets
resource "aws_s3_bucket" "website" {
  bucket = var.website_bucket_name

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Lambda Function
resource "aws_lambda_function" "api" {
  filename         = "dist/serverless.zip"
  function_name    = "personal-website-api"
  role             = aws_iam_role.lambda.arn
  handler          = "handler.handler"
  runtime          = var.lambda_runtime
  memory_size      = var.lambda_memory_size
  timeout          = var.lambda_timeout

  environment {
    variables = {
      MONGODB_URI = var.mongodb_uri
      JWT_SECRET  = var.jwt_secret
    }
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda" {
  name = "personal-website-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy for Lambda
resource "aws_iam_role_policy" "lambda" {
  name = "personal-website-lambda-policy"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name        = "personal-website-api"
  description = "API Gateway for Personal Website"
}

resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "api"
}

resource "aws_api_gateway_method" "any" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.api.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.api.id
  http_method             = aws_api_gateway_method.any.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.api.invoke_arn
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "website" {
  comment = "Personal Website Origin Access Identity"
}

# S3 Bucket Policy for CloudFront
data "aws_iam_policy_document" "website_bucket_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${aws_s3_bucket.website.arn}/*"
    ]
    principals {
      type = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.website.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website_bucket_policy.json
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = "S3-${var.website_bucket_name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.website.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Personal Website Distribution"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.website_bucket_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  price_class = "PriceClass_100"

  logging_config {
    bucket = var.cloudfront_logging_bucket
    prefix = var.cloudfront_logging_prefix
  }
}

# S3 Bucket Objects
resource "aws_s3_object" "website" {
  bucket      = aws_s3_bucket.website.id
  key         = "index.html"
  source      = var.website_assets_path + "/index.html"
  content_type = "text/html"
}

resource "aws_s3_object" "script" {
  bucket      = aws_s3_bucket.website.id
  key         = "script.js"
  source      = var.website_assets_path + "/script.js"
  content_type = "application/javascript"
}

resource "aws_s3_object" "styles" {
  bucket      = aws_s3_bucket.website.id
  key         = "styles.css"
  source      = var.website_assets_path + "/styles.css"
  content_type = "text/css"
}

# Route53 Record (if using custom domain)
resource "aws_route53_record" "website" {
  count = var.website_domain_name != "" ? 1 : 0

  zone_id = var.website_zone_id
  name    = var.website_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# SSL Certificate (if using custom domain)
resource "aws_acm_certificate" "website" {
  count = var.website_domain_name != "" ? 1 : 0

  domain_name       = var.website_domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
