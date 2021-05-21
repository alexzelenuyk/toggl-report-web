import json
import logging
import base64
import codecs
from toggle_report_to_gulp.report import Report
import locale

locale.setlocale(locale.LC_ALL, 'de_DE')
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    logger.info("Received request, body: %s", event)

    body = base64.b64decode(event.get("body")).decode("ascii")
    body_parsed = json.loads(body)
    logger.info(body_parsed)
    year = body_parsed.get("year")
    month = body_parsed.get("month_number")

    report = Report(
        body_parsed.get("api_key"),
        body_parsed.get("name"),
        body_parsed.get("project_number"),
        body_parsed.get("client_name"),
        body_parsed.get("order_no")
    )
    document = report.detailed(
        body_parsed.get("workspace"), year, month, False)

    response = {
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Expose-Headers": "Content-Disposition",
            "Content-Type": "application/pdf",
            "Content-Disposition": f"attachment; filename=Report_{year}_{month}.pdf"
        },
        'statusCode': 200,
        'body': codecs.encode(document, "base64"),
        'isBase64Encoded': True
    }

    return response
