import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs'

export class CdkWorkadventureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const etherpadTask = new ecs.FargateTaskDefinition(this, 'EtherpadTask', {
      memoryLimitMiB: 256,
      cpu: 128,
    });

    etherpadTask.addContainer('etherpad', {
      image: ecs.ContainerImage.fromRegistry('etherpad/etherpad:1.8.6'),
      environment: {
        'TITLE': process.env.ETHERPAD_TITLE || 'Video Chat',
        'DEFAULT_PAD_TEXT': process.env.ETHERPAD_DEFAULT_PAD_TEXT || 'Welcome to Web Chat!\n\n',
        'SKIN_NAME': process.env.ETHERPAD_SKIN_NAME || 'colibris',
        'SKIN_VARIANTS': process.env.ETHERPAD_SKIN_VARIANTS || 'super-light-toolbar super-light-editor light-background full-width-editor',
      },
    });
  }
}
