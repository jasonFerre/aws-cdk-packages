const { AwsCdkConstructLibrary } = require('projen');
const { DependencyType } = require('projen/lib/deps');
const project = new AwsCdkConstructLibrary({
  author: 'geyson',
  authorAddress: 'geysonb04@gmail.com',
  cdkVersion: '1.100.0',
  defaultReleaseBranch: 'main',
  name: 'aws-cdk-packages',
  repositoryUrl: 'https://github.com/jasonFerre/aws-cdk-packages.git',
  cdkDependencies: [
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-python',
    '@aws-cdk/aws-logs',
    '@aws-cdk/core',
    '@aws-cdk/aws-codecommit',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/pipelines',
  ],
  bundledDeps: [
    'deep-diff@^1.0.2',
    'deepmerge',
    '@types/deep-diff',
    '@types/npmlog',
    'npmlog',
  ],
});


//insert packages to project
// project.deps.addDependency('deep-diff@^1.0.2', DependencyType.BUNDLED);
// project.deps.addDependency('deepmerge', DependencyType.BUNDLED);
// project.deps.addDependency('@types/deep-diff', DependencyType.BUNDLED);
// project.deps.addDependency('@types/npmlog', DependencyType.BUNDLED);
// project.deps.addDependency('npmlog', DependencyType.BUNDLED);

project.deps.removeDependency('@types/jest', DependencyType.DEVENV);
project.deps.addDependency('@types/jest@^26.0.19', DependencyType.DEVENV);

project.deps.removeDependency('jest', DependencyType.DEVENV);
project.deps.addDependency('jest@^26.6.3', DependencyType.DEVENV);

project.deps.removeDependency('ts-jest', DependencyType.DEVENV);
project.deps.addDependency('ts-jest@^26.4.4', DependencyType.DEVENV);

// insert commands to package.json
project.setScript('deploy', 'cdk deploy');
project.setScript('destroy', 'cdk destroy');

// ignore packages or files
const commonExclude = ['cdk.out'];
project.npmignore.exclude(...commonExclude);
project.gitignore.exclude(...commonExclude);

project.synth();