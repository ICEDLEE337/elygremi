terraform {
  backend "s3" {
    bucket = "elygremi-tfstate"
    key    = "state"
    region = "us-east-2"
  }

  required_version = ">= 0.13.0"
}
