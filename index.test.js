/* eslint-disable unicorn/import-index */

const runCdkCommands = require('./src/cdkCommands');

jest.mock('@actions/core', () => ({
    getInput: jest.fn((value) => process.env[value]),
    setFailed: jest.fn(),
}));

jest.mock('./src/cdkCommands');

describe('index', () => {
    afterAll(() => jest.restoreAllMocks());

    it('should call run cdk commands with correct arguments', async () => {
        // input
        process.env.AWS_ACCOUNT_ID = '1234';
        process.env.AWS_ROLE_NAME = 'role';
        process.env.AWS_STACK_NAME = 'stack';
        process.env.INFRASTRUCTURE_PATH = '.';
        process.env.AWS_REGION = 'some_region';
        process.env.SKIP_BOOTSTRAP = 'false';

        // secrets
        process.env.AWS_ACCESS_KEY_ID = 'secret_id';
        process.env.AWS_SECRET_ACCESS_KEY = 'secret_password';

        await require('./index.js');

        expect(runCdkCommands).toHaveBeenCalledTimes(1);
        expect(runCdkCommands.mock.calls[0][0]).toMatchSnapshot();
    });
});