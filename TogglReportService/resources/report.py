import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Request: %s", event)

    response = {
        'statusCode': 200,
        'body': 'hello world'
    }

    return response
