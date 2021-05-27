import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import { LambdaPowerToolsFunction, LambdaPowerToolsFunctionProps } from '../src/lambda-power-tools';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'my-demo-stack', { env });

    new LambdaPowerToolsFunction(stack, 'my-function-test', {
      entry: path.resolve(__dirname, '../test/lambda-handler-poetry'),
      index: 'index.py',
      handler: 'handler',
      timeoutFunction: cdk.Duration.seconds(5),
      serviceName: 'druid-construct-function',
    } as LambdaPowerToolsFunctionProps);

    this.stack = [stack];
  }
}

new IntegTesting();
