import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction, PythonFunctionProps } from '@aws-cdk/aws-lambda-python';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface LambdaProps {
  entry: string;
  index: string;
  handler: string;
  runtime?: lambda.Runtime;
  tracing: lambda.Tracing;
  timeout?: cdk.Duration;
}

export class LambdaFunction extends cdk.Construct {
  readonly handler: PythonFunction;
  readonly alias: lambda.Alias;

  constructor(scope: cdk.Construct, id: string, props: LambdaProps) {
    super(scope, id);

    // define props function with required lambda properties
    const properties = {
      entry: props.entry,
      index: props.index,
      handler: props.handler,
      runtime: props.runtime ?? lambda.Runtime.PYTHON_3_8,
      tracing: lambda.Tracing.ACTIVE,
      timeout: props.timeout ?? cdk.Duration.seconds(5),
      logRetention: logs.RetentionDays.ONE_WEEK,
    } as PythonFunctionProps;

    this.handler = new PythonFunction(this, 'proxy-route', properties);

    // automatically set a function in alias
    this.alias = new lambda.Alias(this, 'alias', {
      aliasName: 'Current',
      version: this.handler.currentVersion,
    });
  }
}