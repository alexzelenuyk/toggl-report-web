import json
import logging
from toggle_report_to_gulp.report import Report

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Request: %s", event)

    report = Report("", "", "", "", "")
    document = report.detailed("", 2021, 4, False)

    response = {
        'statusCode': 200,
        'body': "finished"
    }

    return response
