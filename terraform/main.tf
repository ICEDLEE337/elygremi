locals {
  prefix            = terraform.workspace
  is_staging        = length(split("-staging", terraform.workspace)) > 1
  environment       = local.is_staging ? "staging" : "production"
  image             = "747533038441.dkr.ecr.us-east-2.amazonaws.com/oninet:api-${terraform.workspace}"
  domain            = "${var.DOMAIN}"
  zone_name         = "${terraform.workspace}.${local.domain}"
  container_name    = "${local.prefix}-container"
  port              = "3334"
}

data "aws_route53_zone" "domain_zone" {
  name         = local.domain
  private_zone = false
}

resource "aws_default_vpc" "default_vpc" {
}

data "aws_subnets" "default_vpc_subnets" {
  filter {
    name   = "vpc-id"
    values = [aws_default_vpc.default_vpc.id]
  }
}

data "aws_subnet" "default_vpc_subnet" {
  for_each = toset(data.aws_subnets.default_vpc_subnets.ids)
  id       = each.value
}

resource "aws_ecs_cluster" "cluster" {
  name = "${local.prefix}-cluster"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${local.prefix}-ecsTaskExecutionRole"

  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = local.prefix
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "task_execution_logs" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

resource "aws_iam_role_policy_attachment" "task_execution_dynamo" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "task_execution_rds" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSFullAccess"
}

resource "aws_iam_role_policy_attachment" "task_ecr" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
}

resource "aws_iam_role_policy_attachment" "task_logs" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

resource "aws_iam_role_policy_attachment" "task_s3" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_role_policy_attachment" "task_load_balancing" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/ElasticLoadBalancingFullAccess"
}

resource "aws_ecs_task_definition" "definition" {
  family                   = "${local.prefix}-family"
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "1024"
  requires_compatibilities = ["FARGATE"]

  container_definitions = <<DEFINITION
[
  {
    "image": "${local.image}",
    "name": "${local.container_name}",
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": 3334,
        "hostPort": 3334
      }
    ],
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${local.prefix}",
          "awslogs-region": "${var.AWS_REGION}",
          "awslogs-stream-prefix": "ecs"
        }
      },
    "environment": [
            { "name": "AWS_ACCESS_KEY_ID", "value": "${var.AWS_ACCESS_KEY_ID}" },
            { "name": "AWS_BUCKET_UPLOADS", "value": "${var.AWS_BUCKET_UPLOADS}" },
            { "name": "AWS_COGNITO_CLIENT_ID", "value": "${var.AWS_COGNITO_CLIENT_ID}" },
            { "name": "AWS_COGNITO_USER_POOL_ID", "value": "${var.AWS_COGNITO_USER_POOL_ID}" },
            { "name": "AWS_REGION", "value": "${var.AWS_REGION}" },
            { "name": "AWS_SECRET_ACCESS_KEY", "value": "${var.AWS_SECRET_ACCESS_KEY}" },
            { "name": "DOMAIN", "value": "${var.DOMAIN}" },
            { "name": "NODE_ENV", "value": "production" },
            { "name": "PG_CONNECTIONTIMEOUTMILLIS", "value": "3000" },
            { "name": "PG_HOST", "value": "${var.PG_HOST}" },
            { "name": "PG_PASSWORD", "value": "${var.PG_PASSWORD}" },
            { "name": "PG_PORT", "value": "${var.PG_PORT}" },
            { "name": "PG_USER", "value": "${var.PG_USER}" },
            { "name": "PORT", "value":  "3334" },
            { "name": "UI_URL_ACCOUNT", "value": "${var.UI_URL_ACCOUNT}" }
        ]
    }
]
DEFINITION
}

resource "aws_ecs_service" "api_service" {
  name            = "${local.prefix}-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.definition.arn
  desired_count   = 1
  depends_on      = [aws_iam_role.ecs_task_execution_role, aws_alb_listener.ecs_load_balancer_https_listener, aws_alb_listener.ecs_load_balancer_http_listener]
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip = true
    subnets          = [for s in data.aws_subnet.default_vpc_subnet : s.id]
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.ecs_lb_target.arn
    container_name   = local.container_name
    container_port   = local.port
  }
}

resource "aws_security_group" "allow_http_https_sg" {
  name = "${local.prefix}-sg"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
}

resource "aws_route53_zone" "subdomain_zone" {
  name = local.zone_name
}

resource "aws_route53_record" "zone_record" {
  type    = "NS"
  zone_id = data.aws_route53_zone.domain_zone.id
  name    = local.zone_name
  ttl     = "86400"
  records = aws_route53_zone.subdomain_zone.name_servers
}

resource "aws_acm_certificate" "cert" {
  domain_name       = local.domain
  validation_method = "DNS"

  subject_alternative_names = [
    local.zone_name,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.domain_zone.id
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation_record : record.fqdn]
}

resource "aws_lb" "ecs_lb" {
  name               = "${local.prefix}-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_http_https_sg.id]
  subnets            = [for s in data.aws_subnet.default_vpc_subnet : s.id]
}

resource "aws_alb_target_group" "ecs_lb_target" {
  name        = "${local.prefix}-lb-target"
  port        = local.port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 3600
  }

  health_check {
    enabled = true
    matcher = 200
    port = local.port
    protocol = "HTTP"
    path = "/api/health"
  }
}

resource "aws_alb_listener" "ecs_load_balancer_https_listener" {
  load_balancer_arn = aws_lb.ecs_lb.arn
  certificate_arn   = aws_acm_certificate_validation.cert_validation.certificate_arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"

  default_action {
    target_group_arn = aws_alb_target_group.ecs_lb_target.id
    type             = "forward"
  }
}

resource "aws_alb_listener" "ecs_load_balancer_http_listener" {
  load_balancer_arn = aws_lb.ecs_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_route53_record" "app_record" {
  zone_id = aws_route53_zone.subdomain_zone.zone_id
  name    = ""
  type    = "A"
  alias {
    name                   = aws_lb.ecs_lb.dns_name
    zone_id                = aws_lb.ecs_lb.zone_id
    evaluate_target_health = false
  }
}
