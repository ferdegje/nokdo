import { Api, Cognito, StaticSite, StackContext, Table } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  // Create auth provider
  const authByPhone = new Cognito(stack, "AuthByPhone", {
    login: ["phone"],
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        // Bind the table name to our API
        bind: [table],
        environment: {
          UserPoolId: authByPhone.userPoolId,
          IdentityPoolId: authByPhone.cognitoIdentityPoolId,
          UserPoolClientId: authByPhone.userPoolClientId,
        }
      },
    },
    routes: {
      "POST /": "packages/functions/src/lambda.handler",
      "POST /user": {
        function: "packages/functions/src/user.main",
        authorizer: "none",
      },
      "POST /user/login": {
        function: "packages/functions/src/userLogin.main",
        authorizer: "none",
      },
      "GET /private": "packages/functions/src/private.main",
      "GET /public": {
        function: "packages/functions/src/public.main",
        authorizer: "none",
      },
    },
  });

  

  // Allow authenticated users invoke API
  authByPhone.attachPermissionsForAuthUsers(stack, [api]);

  // Deploy our React app
  const site = new StaticSite(stack, "GatsbySite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "public",
    errorPage: "redirect_to_index_page",
    customDomain: stack.stage === "prod" ? "nokdo.org" : `${stack.stage}.nokdo.org`,
    environment: {
      GATSBY_APP_API_URL: api.url,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.customDomainUrl,
    ApiEndpoint: api.url,
    UserPoolId: authByPhone.userPoolId,
    IdentityPoolId: authByPhone.cognitoIdentityPoolId,
    UserPoolClientId: authByPhone.userPoolClientId,
  });
}