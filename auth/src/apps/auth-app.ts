import { AuthApigatewayEvent } from '../common/apigateway/auth-apigateway-event';
import { AuthorizerPolicyResponse } from '../common/apigateway/authorizer-policy-response';

export class AuthApp {
    async run(event: AuthApigatewayEvent): Promise<AuthorizerPolicyResponse> {
        const authHeader = event.authorizationToken;
        const token = process.env.TOKEN;

        if (authHeader !== token) {
            return this.generatePolicy('user', 'Deny', event.methodArn);
        }

        return this.generatePolicy('user', 'Allow', event.methodArn);
    }

    private generatePolicy(principalId: string, effect: string, resource: string) : AuthorizerPolicyResponse {
        return {
            principalId,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: effect,
                        Resource: resource,
                    }
                ]
            }
        };
    }
}
