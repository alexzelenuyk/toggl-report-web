import json
import logging
import base64
import codecs
from toggle_report_to_gulp.report import Report

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Received request, body: %s", event)
    body = event.get("body")
    body_parsed = json.loads(body)
    year = body_parsed["year"]
    month = body_parsed["month_number"]

    report = Report(
        body_parsed["api_key"],
        body_parsed["name"],
        body_parsed["project_number"],
        body_parsed["client_name"],
        body_parsed["order_no"]
    )
    document = report.detailed(body_parsed["workspace"], year, month, False)

    report = Report("0f7178cbdc04c039c0aff7e7eb839917",
                    "test", "test", "test", "test",)
    document = report.detailed("Ole", 2021, 4, False)

    response = {
        'headers': {
            "Content-Type": "application/pdf",
            "Content-Disposition": f"attachment; filename=Report_{year}_{month}.pdf"
        },
        'statusCode': 200,
        'body': codecs.encode(document, "base64"),
        'isBase64Encoded': True
    }

    return response
