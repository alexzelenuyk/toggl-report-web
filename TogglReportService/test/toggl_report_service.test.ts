import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TogglReportService from '../lib/toggl_report_service-stack';

test('Snapshot test', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TogglReportService.TogglReportServiceStack(app, 'MyTestStack');
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
});
