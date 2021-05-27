import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { AppStack } from '../stack/app';

const app = new cdk.App();
let stack: cdk.Stack;

beforeEach(() => {
  if (stack == undefined || stack == null || stack.stackName.length == 0) {
    const env = {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    };
    stack = new AppStack(app, 'test-stack', { env });
  }
});

test('check if pipeline was created', () => {
  expectCDK(stack).to(haveResource('AWS::CodePipeline::Pipeline', {}));
});