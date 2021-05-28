# API Reference

Sample app aws cdk library

# Sample

'''
    const repository = new code_commit.Repository(this, 'repo', {
      repositoryName: 'druid-test'
    });

    const devStageApp = new cdk.Stage(this, 'my-test-stage');

    new Pipeline(this, 'my-pipeline', {
      repository: repository,
      buildComand: 'npm run build',
      devStageApp: devStageApp
    } as PipelineProps)

'''


