import '@aws-cdk/assert/jest';
// import { SynthUtils } from '@aws-cdk/assert';
// import { IntegTesting } from '../src/integ.default';
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { AppStack } from '../stack/app';

// test('integ snapshot validation', () => {
//   const integ = new IntegTesting();
//   integ.stack.forEach((stack) => {
//     expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
//   });
// });

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

test('snapshot stack', () => {
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});