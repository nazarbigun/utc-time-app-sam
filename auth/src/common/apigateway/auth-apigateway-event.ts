export interface AuthApigatewayEvent {
    type: 'TOKEN';
    methodArn: string;
    authorizationToken: string;
}
