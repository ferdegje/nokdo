import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2 } from "aws-lambda";
import cognitoUserPoolHelper from "./svc/cognito.user.pool.helper"

export const main: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body);
        const { username, password } = body;
        const result = await cognitoUserPoolHelper.signIn({ username, password });
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    } catch (err: object) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: err.message
            })
        }
    }
};