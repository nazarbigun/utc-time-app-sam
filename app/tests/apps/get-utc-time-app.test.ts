import 'mocha';
import { expect } from 'chai';

import { GetUtcTimeApp } from '../../src/apps/get-utc-time-app';
import { ApiGatewayResponse } from '../../src/common/apigateway/apigateway-response';

class MockDate extends Date {
    constructor() {
        super('December 17, 1995 03:24:47'); // add whatever date you'll expect to get
    }
}

global.Date = MockDate as unknown as typeof Date;

describe('GetUtcTimeApp instance', () => {
    describe('run', () => {
        it('repository is called to get a record by id', async () => {
            const app = new GetUtcTimeApp();
            const response: ApiGatewayResponse = await app.run();

            const responseTodo = JSON.parse(response.body as string);
            expect(responseTodo.time).to.equal('3:24:47');
        });
    });
});
