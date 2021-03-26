const execa = require('execa');
const runCdkCommands = require('./cdkCommands');

jest.mock('execa');

describe('cdkCommands', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should call process and execa with correct arguments', async () => {
        process.chdir = jest.fn();

        await runCdkCommands({
            AWS_ACCOUNT_ID: 'account_id',
            AWS_REGION: 'eu-west-1',
            AWS_ROLE_NAME: 'role_name',
            AWS_STACK_NAME: 'stack_name',
            INFRASTRUCTURE_PATH: 'some/path/',
            SKIP_BOOTSTRAP: 'false',
        });

        expect(execa.mock.calls[0]).toMatchSnapshot();
        expect(execa.mock.calls[1]).toMatchSnapshot();
    });

    it('should not call bootstrap when SKIP_BOOTSTRAP is not false', async () => {
        process.chdir = jest.fn();

        await runCdkCommands({
            AWS_ACCOUNT_ID: 'account_id',
            AWS_REGION: 'eu-west-1',
            AWS_ROLE_NAME: 'role_name',
            AWS_STACK_NAME: 'stack_name',
            INFRASTRUCTURE_PATH: 'some/path/',
            SKIP_BOOTSTRAP: 'true',
        });

        expect(execa).toHaveBeenCalledTimes(1);
        expect(execa.mock.calls[0]).toMatchSnapshot();
    });

    it('should call process and execa with user-defined arguments', async () => {
        process.chdir = jest.fn();

        const customArguments = '--testargument=abc,--all';
        await runCdkCommands({
            AWS_ACCOUNT_ID: 'account_id',
            AWS_REGION: 'eu-west-1',
            AWS_ROLE_NAME: 'role_name',
            AWS_STACK_NAME: 'stack_name',
            CUSTOM_DEPLOY_ARGUMENTS: customArguments,
            CUSTOM_BOOTSTRAP_ARGUMENTS: customArguments,
            INFRASTRUCTURE_PATH: 'some/path/',
            SKIP_BOOTSTRAP: 'false',
        });

        expect(execa.mock.calls[0]).toMatchSnapshot();
        expect(execa.mock.calls[1]).toMatchSnapshot();
    });
});
