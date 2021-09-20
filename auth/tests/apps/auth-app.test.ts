import { AuthApp } from '../../src/apps/auth-app';
import { AuthorizerPolicyResponse } from '../../src/common/apigateway/authorizer-policy-response';
import { AuthApigatewayEventMock } from '../mocks/apigateway-event-mock';

class SecretsManagerMock {
  send = jest.fn().mockReturnValue({ SecretString: 'validToken' })
}

class GetSecretValueCommandMock {}

jest.mock('@aws-sdk/client-secrets-manager', () => {
  return {
    SecretsManager: jest.fn(() => new SecretsManagerMock()),
    GetSecretValueCommand: jest.fn(() => new GetSecretValueCommandMock())
  }
})

describe('GetUtcTimeApp instance', () => {
  describe('run', () => {
    it('should return authorized policy', async () => {
      const app = new AuthApp();
      const response: AuthorizerPolicyResponse = await app.run(new AuthApigatewayEventMock('validToken'));

      expect(response).toMatchSnapshot();
    });

    it('should return not authorized policy', async () => {
      const app = new AuthApp();
      const response: AuthorizerPolicyResponse = await app.run(new AuthApigatewayEventMock('invalidToken'));

      expect(response).toMatchSnapshot();
    });
  });
});
