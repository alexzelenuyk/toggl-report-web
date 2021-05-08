import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";

export class TogglReportService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const handler = new PythonFunction(this, 'ReportHandlerPython', {
      entry: 'resources',
      index: 'report.py',
      handler: 'lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_8,
    });

    const api = new apigateway.RestApi(this, "report-api", {
      restApiName: "Toggl report API",
      description: "Api to generate toggl report."
    });

    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getWidgetsIntegration);
  }
}
