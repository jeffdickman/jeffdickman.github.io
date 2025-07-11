variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "website_domain_name" {
  description = "Domain name for the website"
  type        = string
}

variable "website_bucket_name" {
  description = "Name of the S3 bucket for website assets"
  type        = string
}

variable "lambda_runtime" {
  description = "Lambda function runtime"
  type        = string
  default     = "nodejs18.x"
}

variable "lambda_memory_size" {
  description = "Lambda function memory size in MB"
  type        = number
  default     = 128
}

variable "lambda_timeout" {
  description = "Lambda function timeout in seconds"
  type        = number
  default     = 30
}

variable "mongodb_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret for authentication"
  type        = string
  sensitive   = true
}

variable "website_assets_path" {
  description = "Path to website assets"
  type        = string
  default     = "frontend/"
}

variable "cloudfront_logging_bucket" {
  description = "Bucket name for CloudFront logging"
  type        = string
  default     = ""
}

variable "cloudfront_logging_prefix" {
  description = "Prefix for CloudFront logs"
  type        = string
  default     = "cloudfront/"
}

variable "website_zone_id" {
  description = "Route53 zone ID for custom domain"
  type        = string
  default     = ""
}
