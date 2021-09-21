# UTC Time App

This project is created to get UTC time. Written in TypeScript using the [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model).

This project includes two AWS Lambda functions, one for getting UTC time and the second one is the API authorizer. It includes [SAM](https://github.com/awslabs/serverless-application-model) configuration to deploy to AWS. 

## Build, run, test, deploy

### Build

#### UTC Time lambda fn:
To build UTC lambda fn you have to execute the following commands from the root directory:
```
cd app // Change directory
npm i  // install dependencies
npm run fast-compile // compile typescript
```
this will generate ```/app/dist/``` folder with the source code

#### Authorizer lambda fn:
To build Authorizer lambda fn you have to execute the following commands:
```
$ cd auth // Change directory
$ npm i  // install dependencies
$ npm run fast-compile // compile typescript
```
this will generate ```/auth/dist/``` folder with the source code

### Run

Prerequisites:
* Docker [Install the Docker](https://docs.docker.com/get-docker/)
* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* GNU Make On Windows, you can use [Chocolatey](https://chocolatey.org/) to install Make by running `choco install make`

Execute the following command to run API locally:
```
  $ sam local start-api
```

### Test
Once the template is generated, and you have installed the dependencies via `$ npm install` in both folders ```app``` and ```auth``` you can run the unit tests, lint the project and compile the project with the following NPM scripts.

```
$ npm run compile
$ npm run test
$ npm run lint
```

Both the `compile` and the `test` commands will _always_ run the `lint` process. If you want to skip linting during compilation of testing you can use the `fast-compile` or the `fast-test` commands instead.

### Deploy
#### Deploy to env
To deploy changes simply push changes to origin master branch and it will automatically trigger CI/CD
using GitHub actions and SAM deploy and deploy to two environments ```stage``` and ```prod```

#### Deploy manually to new env

Prerequisites:
* AWS CLI - [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* GNU Make On Windows, you can use [Chocolatey](https://chocolatey.org/) to install Make by running `choco install make`
* Install dependencies in both ```app``` and ```auth``` using:
```
npm --prefix ./app/ i
npm --prefix ./auth/ i
```
* Next build both functions:
```
npm --prefix ./app/ run compile
npm --prefix ./auth/ run compile
```
* Create package
```
sam package \
--template-file template.yml \
--s3-bucket <BUCKET_NAME> \
--output-template-file template-output.yml
```
* Deploy package
```
sam deploy \             
--template-file template-output.yml \
--stack-name <NAME> \            
--capabilities CAPABILITY_IAM
```
