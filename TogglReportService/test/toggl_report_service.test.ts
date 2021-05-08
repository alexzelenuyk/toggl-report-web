import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TogglReportService from '../lib/toggl_report_service-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TogglReportService.TogglReportServiceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
