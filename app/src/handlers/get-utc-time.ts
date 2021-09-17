import { ApiGatewayEvent } from '../common/apigateway/apigateway-event';
import { ApiGatewayResponse } from '../common/apigateway/apigateway-response';
import { GetUtcTimeApp } from '../apps/get-utc-time-app';
import { LambdaApp } from '../apps/lambda-app';

/**
 * Sample Lambda function which creates an instance of a GetByIdApp and executes it.
 * The GetByIdApp evaluates the request path parameters and queries DynamoDB for the Id given.
 *
 * @param {Object} event - Input event to the Lambda function
 *
 * @returns {Object} object - Object containing the TodoItem stored.
 *
 */
export const handler = async (event: ApiGatewayEvent): Promise<ApiGatewayResponse> => {
    const app: LambdaApp = new GetUtcTimeApp();

    console.log('Running the GetUtcTimeApp');
    return app.run(event);
};
