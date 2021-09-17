import { AuthApigatewayEvent } from '../common/apigateway/auth-apigateway-event';
import { AuthApp } from '../apps/auth-app';
import { AuthorizerPolicyResponse } from '../common/apigateway/authorizer-policy-response';

export const handler = async (event: AuthApigatewayEvent): Promise<AuthorizerPolicyResponse> => {
    const app = new AuthApp();

    console.log('Running the AuthApp');
    return app.run(event);
};
