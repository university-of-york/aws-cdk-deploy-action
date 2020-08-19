# AWS CDK Deploy Action

![CI](https://github.com/university-of-york/aws-cdk-deploy-action/workflows/CI/badge.svg)

This action deploys AWS CDK Stacks through yaml files.

## Usage

```yml
name: 'Deploy CDK Stack to Production'
on:
    push:
        branches:
            - main

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: university-of-york/aws-cdk-deploy-action@v1.0
              with:
                  AWS_STACK_NAME: 'my-stack-name'
                  AWS_ROLE_NAME: 'DeploymentRole'
                  AWS_REGION: 'us-east-1'
                  INFRASTRUCTURE_PATH: '.'
              env:
                  AWS_ACCOUNT_ID: ${{ secrets.AWS_ACCOUNT_ID }}
                  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
                  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Inputs

-   `AWS_STACK_NAME` - [**Required**]. The Stack name that is going to be published.
    -   Type: `string`
-   `AWS_ROLE_NAME` - [**Required**]. The name of the IAM role to use for the deployment step
    -   Type: `string`
-   `INFRASTRUCTURE_PATH` - [**Required**]. Path to where infrastructure lives
    -   Type: `string`
-   `AWS_REGION` - [**Optional**]. AWS Target region for the deployment
    -   Type: `string`
    -   Default: `eu-west-1`

### Environment variables

-   `AWS_ACCOUNT_ID` - [**Required**]. Target aws account for the deployment.
    -   Type: `string`
-   `AWS_ACCESS_KEY_ID` - [**Required**]. AWS Access Key ID.
    -   Type: `string`
-   `AWS_SECRET_ACCESS_KEY` - [**Required**]. AWS Secret Access Key.
    -   Type: `string`

## Development

PRs are welcome.

### Commits

The project uses [semantic-release](https://github.com/semantic-release/semantic-release) to:

-   tag and version
-   tracking the changes in CHANGELOG.md

This is automated via continuous integration.

The only thing you need to worry about is following the default [semantic-release commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines):

Quick reference:

patches:

\$ git commit -a -m "fix: fixed a bug in our parser"
features:

\$ git commit -a -m "feat: we now have a parser \o/"
breaking changes:

\$ git commit -a -m "feat: introduces a new parsing library
BREAKING CHANGE: new library does not support foo-construct"
other changes:

your choice e.g., docs, chore, etc.

### Prerequisites

Node.js and npm are required.

To install these you can either use the installer from [nodejs](https://www.nodejs.org/) or use a version manager:

-   https://github.com/nvm-sh/nvm
-   https://github.com/tj/n
-   https://github.com/asdf-vm/asdf
-   https://github.com/Schniz/fnm

This action has been build using the following dev dependencies:

-   [prettier](https://github.com/prettier/prettier)
-   [xo](https://github.com/xojs/xo)
-   [lint-staged](https://github.com/okonet/lint-staged)
-   [husky](https://github.com/typicode/husky)
-   [ncc](https://github.com/vercel/ncc)

These tools are configured to run via git hooks and perform critical tasks such as:

-   linting
-   building

Do not skip git commit hooks.

## License

The action and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
