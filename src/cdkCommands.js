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

const runCdkCommands = async ({
    AWS_ACCOUNT_ID,
    AWS_ROLE_NAME,
    AWS_REGION,
    AWS_STACK_NAME,
    INFRASTRUCTURE_PATH,
    SKIP_BOOTSTRAP,
}) => {
    const sharedArguments = getSharedArguments({
        AWS_ACCOUNT_ID,
        AWS_ROLE_NAME,
        AWS_STACK_NAME,
    });

    if (SKIP_BOOTSTRAP === 'false') {
        await execa(
            `npx`,
            [
                'cdk',
                'bootstrap',
                `aws://${getStackEnvironment({AWS_ACCOUNT_ID, AWS_REGION})}`,
                ...sharedArguments,
            ],
            {
                cwd: INFRASTRUCTURE_PATH,
            }
        );
    }

    await execa(`npx`, ['cdk', 'deploy', getApproval(), ...sharedArguments], {
        cwd: INFRASTRUCTURE_PATH,
    });
};

module.exports = runCdkCommands;
