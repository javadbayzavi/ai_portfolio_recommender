import os
import boto3

#In order to use localaws and localstack firstly export LOCALSTACK=True in the your shell
LOCALSTACK = os.getenv("LOCALSTACK", "false").lower() == "true"

def get_aws_client(service_name):
    return boto3.client(
        service_name,
        endpoint_url="http://localhost:4566" if LOCALSTACK else None,
        region_name="us-east-1",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )
