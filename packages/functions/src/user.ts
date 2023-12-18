import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2 } from "aws-lambda";
import cognitoUserPoolHelper from "./svc/cognito.user.pool.helper"

export const main: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body);
        const { password, email } = body;
        // const result = process.env.USER_POOL_ID;
        const result = await cognitoUserPoolHelper.signUp({ email, password });
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `${result} is created.`,
            })
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