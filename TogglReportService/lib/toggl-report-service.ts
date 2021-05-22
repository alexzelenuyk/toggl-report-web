import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import { RemovalPolicy } from "@aws-cdk/core";

export class TogglReportService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "TogglReportWebsite", {
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html"
    });

    new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
      sources: [s3Deployment.Source.asset("../Website-foo")],
      destinationBucket: bucket
    });

    const handler = new PythonFunction(this, 'ReportHandlerPython', {
      entry: 'resources',
      index: 'report.py',
      handler: 'lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_8,
    });

    const api = new apigateway.RestApi(this, "ReportApi", {
      restApiName: "Toggl report API",
      description: "Api to generate toggl report.",
      binaryMediaTypes: ["*/*", "application/pdf"],
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      }
    });

    const post = new apigateway.LambdaIntegration(handler);

    api.root.addMethod("POST", post);
  }
}
