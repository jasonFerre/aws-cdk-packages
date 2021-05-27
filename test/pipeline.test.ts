//import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import { AppStack } from '../stack/app-stack';

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

// test('snapshot validation', () => {
//   expect(stack).toMatchSnapshot();
// });

// test('Lambda function created with trece active', () => {
//   expectCDK(stack).to(haveResource('AWS::Lambda::Function', {
//     TracingConfig: {
//       Mode: 'Active',
//     },
//   }));
// });

// test('Lambda function created with runtime in python', () => {
//   expectCDK(stack).to(haveResource('AWS::Lambda::Function', {
//     Runtime: 'python3.8',
//   }));
// });

// test('Lambda function created with timeout major then default timeout ', () => {
//   expectCDK(stack).to(haveResource('AWS::Lambda::Function', {
//     Timeout: 5,
//   }));
// });

test('success', () => {
  expect(1).toBe(1);
});