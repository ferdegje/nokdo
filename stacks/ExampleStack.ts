import { Api, Cognito, StaticSite, StackContext, Table } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        // Bind the table name to our API
        bind: [table],
      },
    },
    routes: {
      "POST /": "packages/functions/src/lambda.handler",
      "GET /private": "packages/functions/src/private.main",
      "GET /public": {
        function: "packages/functions/src/public.main",
        authorizer: "none",
      },
    },
  });

  // Create auth provider
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Deploy our React app
  const site = new StaticSite(stack, "GatsbySite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "public",
    errorPage: "redirect_to_index_page",
    environment: {
      GATSBY_APP_API_URL: api.url,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });
}