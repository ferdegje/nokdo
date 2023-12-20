import { APIGatewayProxyEvent, APIGatewayProxyHandlerV2 } from "aws-lambda";
import cognitoUserPoolHelper from "./svc/cognito.user.pool.helper"

export const main: APIGatewayProxyHandlerV2 = async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body);
        const { phone, password, code } = body;
        // const result = process.env.USER_POOL_ID;
        if (password !== undefined) {
            const result = await cognitoUserPoolHelper.signUp({ phone, password });
            
        } else if (code !== undefined) {
            const result = await cognitoUserPoolHelper.confirmSignUp({ phone, code});
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `${result} is created.`,
                })
            }
        } else {
            throw new Error(`Enveloppe of body to POST user was incorrect: ${JSON.stringify(body)}`)
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