import * as cdk from '@aws-cdk/core';
import * as code_commit from '@aws-cdk/aws-codecommit';
import { Pipeline, PipelineProps } from '../src/pipeline';

export class AppStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    // new LambdaPowerToolsFunction(this, 'my-function-test', {
    //   entry: path.resolve(__dirname, '../test/lambda-handler-poetry'),
    //   index: 'index.py',
    //   handler: 'handler',
    //   timeoutFunction: cdk.Duration.seconds(5),
    //   serviceName: 'druid-construct-function',
    // } as LambdaPowerToolsFunctionProps);

    const repository = new code_commit.Repository(this, 'repo', {
      repositoryName: 'druid-test'
    });

    const devStageApp = new cdk.Stage(this, 'my-test-stage');

    new Pipeline(this, 'my-pipeline', {
      repository: repository,
      buildComand: 'npm run build',
      devStageApp: devStageApp
    } as PipelineProps)
  }
}


