const runCdkCommands = require('./cdkCommands');
const handlerFactory = require('./handlerFactory');
const core = require('@actions/core');
jest.mock('@actions/core', () => {
    const { setFailed } = jest.requireActual('@actions/core');

    return {
        setFailed,
        getInput: jest.fn(),
    };
});

jest.mock('./cdkCommands');

describe('handlerFactory', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.restoreAllMocks());

    it('should call run cdk commands with correct arguments', async () => {
        const userInput = {
            AWS_ROLE_NAME: 'role',
            AWS_STACK_NAME: 'stack',
            INFRASTRUCTURE_PATH: '.',
            AWS_REGION: 'some_region',
            SKIP_BOOTSTRAP: 'false',
        };

        core.getInput = jest.fn((value) => userInput[value]);

        // secrets
        process.env.AWS_ACCOUNT_ID = '1234';
        process.env.AWS_ACCESS_KEY_ID = 'secret_id';
        process.env.AWS_SECRET_ACCESS_KEY = 'secret_password';

        await handlerFactory();

        expect(runCdkCommands).toHaveBeenCalledTimes(1);
        expect(runCdkCommands.mock.calls[0][0]).toMatchSnapshot();
    });

    it('should call run cdk commands with user-defined arguments', async () => {
        const userInput = {
            AWS_ROLE_NAME: 'role',
            AWS_STACK_NAME: 'stack',
            INFRASTRUCTURE_PATH: '.',
            AWS_REGION: 'some_region',
            SKIP_BOOTSTRAP: 'false',
            CUSTOM_BOOTSTRAP_ARGUMENTS: '--testargument=abc,--all',
            CUSTOM_DEPLOY_ARGUMENTS: '--testargument=abc,--all',
        };

        core.getInput = jest.fn((value) => userInput[value]);

        // secrets
        process.env.AWS_ACCOUNT_ID = '1234';
        process.env.AWS_ACCESS_KEY_ID = 'secret_id';
        process.env.AWS_SECRET_ACCESS_KEY = 'secret_password';

        await handlerFactory();

        expect(runCdkCommands).toHaveBeenCalledTimes(1);
        expect(runCdkCommands.mock.calls[0][0]).toMatchSnapshot();
    });
});
