import * as code_commit from '@aws-cdk/aws-codecommit';
import * as cdk from '@aws-cdk/core';
import { Pipeline, PipelineProps } from './pipeline';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'my-demo-stack', { env });

    const repository = new code_commit.Repository(stack, 'repo', {
      repositoryName: 'druid-test',
    });

    new Pipeline(stack, 'my-pipeline', {
      repository: repository,
      buildComand: 'npm run build',
    } as PipelineProps);

    this.stack = [stack];
  }
}

new IntegTesting();
