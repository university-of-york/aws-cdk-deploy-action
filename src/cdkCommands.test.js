const runCdkCommands = require('./cdkCommands');
const execa = require('execa');

jest.mock('execa');

describe('cdkCommands', () => {
    it('should call execa with correct arguments', async () => {
        await runCdkCommands({
            AWS_ACCOUNT_ID: 'account_id',
            AWS_ROLE_NAME: 'role_name',
            AWS_STACK_NAME: 'stack_name',
            INFRASTRUCTURE_LOCATION: 'some/path/',
        });
        expect(execa.mock.calls[0]).toMatchSnapshot();
        expect(execa.mock.calls[1]).toMatchSnapshot();
        expect(execa.mock.calls[2]).toMatchSnapshot();
    });
});
