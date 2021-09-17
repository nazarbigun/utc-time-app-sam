import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';

import { LambdaApp } from './lambda-app';

/**
 * GetUtcTimeApp is a LambdaApp that returns the current utc time.
 */
export class GetUtcTimeApp implements LambdaApp {
    async run(): Promise<ApiGatewayResponse> {
        try {
            const now = new Date();
            const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;

            return { statusCode: 200, body: JSON.stringify({ time }) };

        } catch(err) {
            return { statusCode: 500 };
        }
    }
}
