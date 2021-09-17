interface PolicyStatement {
    Action: string;
    Effect: string;
    Resource: string;
}

interface PolicyDocument {
    Version: string;
    Statement: PolicyStatement[];
}

export interface AuthorizerPolicyResponse {
    principalId: string;
    policyDocument: PolicyDocument
}
