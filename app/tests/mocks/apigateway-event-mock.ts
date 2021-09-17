import { ApiGatewayEvent } from '../../src/common/apigateway/apigateway-event';

export class ApiGatewayEventMock implements ApiGatewayEvent {
        body = '';
        resource = '/';
        path = '/utc-time';
        httpMethod = 'get';
        headers = {
            'Content-Type': 'application/json'
        };
        pathParameters = {};
        requestContext = {
            accountId: '123456789',
            resourceId: '123456789',
            stage: 'prod',
            requestId: 'abcdefg',
            requestTime: new Date().toString(),
            requestTimeEpoch: Date.now(),
            path: '/',
            resourcePath: '/',
            httpMethod: 'post',
            apiId: 'abcdefg'
        };
}
