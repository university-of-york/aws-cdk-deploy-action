const execa = require('execa');

const getSharedArguments = ({
    AWS_ACCOUNT_ID,
    AWS_ROLE_NAME,
    AWS_STACK_NAME,
}) => [
    '--role-arn',
    `arn:aws:iam::${AWS_ACCOUNT_ID}:role/${AWS_ROLE_NAME}`,
    '--toolkit-stack-name',
    `${AWS_STACK_NAME}-cdk-toolkit`,
];

const runCdkCommands = async ({
    AWS_ACCOUNT_ID,
    AWS_ROLE_NAME,
    AWS_STACK_NAME,
    INFRASTRUCTURE_LOCATION,
}) => {
    await execa('cd', [INFRASTRUCTURE_LOCATION]);
    const sharedArguments = getSharedArguments({
        AWS_ACCOUNT_ID,
        AWS_ROLE_NAME,
        AWS_STACK_NAME,
    });

    await execa('npx', ['cdk', 'bootstrap', '--', ...sharedArguments]);

    return execa('npx', [
        'cdk',
        'deploy',
        '--',
        '--require-approval',
        'never',
        ...sharedArguments,
    ]);
};

module.exports = runCdkCommands;
