const execa = require('execa');

const getRoleArguments = ({ AWS_ACCOUNT_ID, AWS_ROLE_NAME }) => {
    return [
        '--role-arn',
        `arn:aws:iam::${AWS_ACCOUNT_ID}:role/${AWS_ROLE_NAME}`,
    ].join('=');
};

const getStackArguments = ({ AWS_STACK_NAME }) => {
    return ['--toolkit-stack-name', `${AWS_STACK_NAME}-cdk-toolkit`].join('=');
};

const getStackEnvironment = ({ AWS_ACCOUNT_ID, AWS_REGION }) =>
    [AWS_ACCOUNT_ID, AWS_REGION].join('/');

const getSharedArguments = ({
    AWS_ACCOUNT_ID,
    AWS_ROLE_NAME,
    AWS_STACK_NAME,
}) =>
    [
        AWS_ROLE_NAME && getRoleArguments({ AWS_ROLE_NAME, AWS_ACCOUNT_ID }),
        getStackArguments({ AWS_STACK_NAME }),
    ].filter(Boolean);

const getApproval = () => '--require-approval=never';

const getUserDefinedArguments = (userDefinedArguments) => {
    if (!userDefinedArguments) {
        return [];
    }

    return userDefinedArguments.split(',').filter(Boolean);
};

const runCdkCommands = async ({
    AWS_ACCOUNT_ID,
    AWS_ROLE_NAME,
    AWS_REGION,
    AWS_STACK_NAME,
    CUSTOM_BOOTSTRAP_ARGUMENTS,
    CUSTOM_DEPLOY_ARGUMENTS,
    INFRASTRUCTURE_PATH,
    SKIP_BOOTSTRAP,
}) => {
    const sharedArguments = getSharedArguments({
        AWS_ACCOUNT_ID,
        AWS_ROLE_NAME,
        AWS_STACK_NAME,
    });

    if (SKIP_BOOTSTRAP !== 'true') {
        await execa(
            `npx`,
            [
                'cdk',
                'bootstrap',
                `aws://${getStackEnvironment({ AWS_ACCOUNT_ID, AWS_REGION })}`,
                ...sharedArguments,
                ...getUserDefinedArguments(CUSTOM_BOOTSTRAP_ARGUMENTS),
            ],
            {
                cwd: INFRASTRUCTURE_PATH,
            }
        );
    }

    await execa(
        `npx`,
        [
            'cdk',
            'deploy',
            getApproval(),
            ...sharedArguments,
            ...getUserDefinedArguments(CUSTOM_DEPLOY_ARGUMENTS),
        ],
        {
            cwd: INFRASTRUCTURE_PATH,
        }
    );
};

module.exports = runCdkCommands;
