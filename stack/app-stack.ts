import * as cdk from '@aws-cdk/core';
import { LambdaPowerToolsFunction, LambdaPowerToolsFunctionProps } from '../src/lambda-power-tools';
import * as path from 'path';

export class AppStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new LambdaPowerToolsFunction(this, 'my-function-test', {
      entry: path.resolve(__dirname, '../test/lambda-handler-poetry'),
      index: 'index.py',
      handler: 'handler',
      timeoutFunction: cdk.Duration.seconds(5),
      serviceName: 'druid-construct-function',
    } as LambdaPowerToolsFunctionProps);

    // const repository = new code_commit.Repository(this, 'repo', {
    //   repositoryName: 'druid-test'
    // });

    // new Pipeline(this, 'my-pipeline', {
    //   repository: repository,
    //   buildComand: 'npm run build'
    // } as PipelineProps)
  }
}


