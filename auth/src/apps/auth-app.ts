import { SecretsManager, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { AuthApigatewayEvent } from '../common/apigateway/auth-apigateway-event';
import { AuthorizerPolicyResponse } from '../common/apigateway/authorizer-policy-response';

export class AuthApp {
  async run(event: AuthApigatewayEvent): Promise<AuthorizerPolicyResponse> {
    const authHeader = event.authorizationToken;
    try {
      const client = new SecretsManager({
        region: process.env.AWS_REGION // Your region
      });

      const command = new GetSecretValueCommand({ SecretId: process.env.SECRET_NAME });
      const data = await client.send(command);

      if (authHeader !== data.SecretString) {
        return this.generatePolicy('user', 'Deny', event.methodArn);
      }

      return this.generatePolicy('user', 'Allow', event.methodArn);
    }
    catch (err) {
      console.log(err);
      throw new Error('You have issue with getting secret.')
    }
  }

  private generatePolicy(principalId: string, effect: string, resource: string): AuthorizerPolicyResponse {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
          }
        ]
      }
    };
  }
}
