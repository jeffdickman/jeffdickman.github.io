terraform {
  backend "s3" {
    bucket = "personal-website-terraform-state"
    key    = "personal-website/terraform.tfstate"
    region = "us-west-2"
  }
}
