variable "AWS_ACCESS_KEY_ID" { type = string }
variable "AWS_BUCKET_UPLOADS" { type = string }
variable "AWS_COGNITO_CLIENT_ID" { type = string }
variable "AWS_COGNITO_USER_POOL_ID" { type = string }
variable "AWS_REGION" { type = string }
variable "AWS_SECRET_ACCESS_KEY" {
    type = string
    sensitive   = true
}
variable "DOMAIN" { type = string }
variable "NODE_ENV" { type = string }
variable "PG_CONNECTIONTIMEOUTMILLIS" { type = string }
variable "PG_HOST" { type = string }
variable "PG_PASSWORD" { type = string }
variable "PG_PORT" { type = string }
variable "PG_USER" { type = string }
variable "PORT" { type = string }
variable "UI_URL_ACCOUNT" { type = string }