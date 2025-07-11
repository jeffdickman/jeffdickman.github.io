output "website_url" {
  description = "URL of the website"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "api_url" {
  description = "URL of the API Gateway"
  value       = aws_api_gateway_rest_api.api.execution_arn
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website.bucket
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.api.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = aws_lambda_function.api.arn
}
