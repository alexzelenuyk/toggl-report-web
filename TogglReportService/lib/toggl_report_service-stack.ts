import * as cdk from '@aws-cdk/core';
import * as toggl_report_service from '../lib/toggl-report-service';

export class TogglReportServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new toggl_report_service.TogglReportService(this, 'ToggleReport');
  }
}
