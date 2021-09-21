import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';

import { LambdaApp } from './lambda-app';

/**
 * GetUtcTimeApp is a LambdaApp that returns the current utc time.
 */
export class GetUtcTimeApp implements LambdaApp {
    async run(): Promise<ApiGatewayResponse> {
        try {
            const time = this.getUTCTime();

            return { statusCode: 200, body: JSON.stringify({ time }) };

        } catch(err) {
            return { statusCode: 500 };
        }
    }

    private getUTCTime(): string {
        const now = new Date();

        return `${now.getUTCHours()}:${this.getUTCMinutes(now)}:${this.getUTCSeconds(now)}`;
    }

    private getUTCMinutes(date: Date): string {
        const minutes = date.getUTCMinutes();

        return `${minutes < 10 ? '0' : ''}${minutes}`;
    }

    private getUTCSeconds(date: Date): string {
        const minutes = date.getUTCSeconds();

        return `${minutes < 10 ? '0' : ''}${minutes}`;
    }
}
