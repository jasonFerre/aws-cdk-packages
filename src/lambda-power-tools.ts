import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction, PythonFunctionProps } from '@aws-cdk/aws-lambda-python';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';
import { overrideProps } from './core/utils';

export enum LogLevelEnum {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL'
}

export interface LambdaPowerToolsFunctionProps extends PythonFunctionProps {
  readonly serviceName: string;
  readonly logLevel?: LogLevelEnum;
  readonly timeoutFunction?: cdk.Duration;
}

export class LambdaPowerToolsFunction extends PythonFunction {
  readonly alias: lambda.Alias;

  constructor(scope: cdk.Construct, id: string, props: LambdaPowerToolsFunctionProps) {

    const defaultProps = {
      runtime: lambda.Runtime.PYTHON_3_8,
      tracing: lambda.Tracing.ACTIVE,
      retentionDays: logs.RetentionDays.ONE_WEEK,
      timeout: props?.timeoutFunction || cdk.Duration.seconds(5),
      environment: {
        POWERTOOLS_SERVICE_NAME: props?.serviceName,
        LOG_LEVEL: props?.logLevel || LogLevelEnum.INFO,
      },
    };

    const _functionProps = overrideProps(defaultProps, props);

    super(scope, id, _functionProps);

    // automatically set a function in alias
    this.alias = new lambda.Alias(this, 'alias', {
      aliasName: 'Current',
      version: this.currentVersion,
    });
  }
}