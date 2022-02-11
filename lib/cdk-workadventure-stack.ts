import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class CdkWorkadventureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const jitsiTask = new ecs.FargateTaskDefinition(this, 'JitsiTask', {
      memoryLimitMiB: 2048,
      cpu: 1024,
    });
    const webContainer = jitsiTask.addContainer("web", {
      image: ecs.ContainerImage.fromRegistry("jitsi/web"),
      portMappings: [
        { containerPort: 80 },
        { containerPort: 443 },
      ],
    });
    const prosodyContainer = jitsiTask.addContainer("prosody", {
      image: ecs.ContainerImage.fromRegistry("jitsi/prosody"),
      portMappings: [
        { containerPort: 5222 },
        { containerPort: 5347 },
        { containerPort: 5280 },
      ],
    });
    const jicofoContainer = jitsiTask.addContainer("jicofo", {
        image: ecs.ContainerImage.fromRegistry("jitsi/jicofo"),
    });
    const jvbContainer = jitsiTask.addContainer("jvb", {
      image: ecs.ContainerImage.fromRegistry("jitsi/jvb:latest"),
      portMappings: [
        { containerPort: 10000, protocol: ecs.Protocol.UDP },
        { containerPort: 4443 },
      ],
    });
  }
}
