// libraries
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class Step01HelloLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });

    const api = new apigateway.LambdaRestApi(this, "myLambdaEndpoint", {
      handler: hello,
      proxy: false,
    });

    const api2 = new apigateway.LambdaRestApi(this, "myLambdaEndpoint2", {
      handler: hello,
      proxy: false,
    });

    const items = api.root.addResource("cars");
    items.addMethod("GET"); // GET /cars

    const items2 = api2.root.addResource("trucks");
    items2.addMethod("GET"); // GET /trucks
  }
}
