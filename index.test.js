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
        process.env.AWS_ACCOUNT_ID = '1234';
        process.env.AWS_ROLE_NAME = 'role';
        process.env.AWS_STACK_NAME = 'stack';
        process.env.INFRASTRUCTURE_LOCATION = '.';

        await require('./index.js');

        expect(runCdkCommands).toHaveBeenCalledTimes(1);
        expect(runCdkCommands.mock.calls[0][0]).toMatchSnapshot();
    });
});
