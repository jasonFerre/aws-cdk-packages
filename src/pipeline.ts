import * as code_commit from '@aws-cdk/aws-codecommit';
import * as code_pipeline from '@aws-cdk/aws-codepipeline';
import * as pipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, PhysicalName, Stage } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';


export interface PipelineProps {
  readonly repository?: code_commit.Repository;
  readonly buildCommand?: string;
  readonly repositoryName?: string;
  readonly devStageApp: Stage;
}

export class Pipeline extends Construct {
  pipeline: CdkPipeline;

  constructor(scope: Construct, id: string, props: PipelineProps) {
    super(scope, id);

    let repository: code_commit.Repository;

    if (props.repository) { repository = props.repository; } else {
      repository = new code_commit.Repository(this, 'repo', {
        repositoryName: props.repositoryName ?? PhysicalName.GENERATE_IF_NEEDED,
      });
    }

    //begginer the steps to code pipeline
    //use this artifact for output code generated by pipeline
    const sourceArtifact = new code_pipeline.Artifact();
    const cloudAssemblyArtifact = new code_pipeline.Artifact();

    this.pipeline = new CdkPipeline(this, 'pipeline', {
      cloudAssemblyArtifact,

      sourceAction: new pipeline_actions.CodeCommitSourceAction({
        output: sourceArtifact,
        actionName: 'code-commit',
        repository: repository,
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: props?.buildCommand ?? 'npm run build',
        environment: {
          privileged: true,
        },
      }),
    });

    this.pipeline.addApplicationStage(props.devStageApp);
  }
}