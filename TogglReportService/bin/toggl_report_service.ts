#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TogglReportServiceStack } from '../lib/toggl_report_service-stack';

const app = new cdk.App();
new TogglReportServiceStack(app, 'TogglReportServiceStack');
