terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.31.0"
    }
  }
}

provider "aws" {
  region                   = "us-east-2"
  profile                  = "conceptos"
  shared_credentials_files = ["/Users/lee/.aws/credentials"]
}