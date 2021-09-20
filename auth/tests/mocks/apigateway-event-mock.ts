import { AuthApigatewayEvent } from '../../src/common/apigateway/auth-apigateway-event';

export class AuthApigatewayEventMock implements AuthApigatewayEvent {
  public type: 'TOKEN';
  public methodArn: string;

  constructor(public authorizationToken: string) {
    this.type = 'TOKEN';
    this.methodArn = 'arn:aws:resource:region:user_id:key:some_id';
  }
}
