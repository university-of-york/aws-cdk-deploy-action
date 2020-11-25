const execa = require('execa');
jest.mock('execa');

test('should execute git commands', async () => {
    process.env.GITHUB_TOKEN = '123';
    process.env.GITHUB_REPOSITORY = 'some-name';

    require('./tag-last-as-major'); // eslint-disable-line import/no-unassigned-import
    // setting a delay is required to get the mock output of each function
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(execa.mock.calls[0]).toMatchSnapshot();
    expect(execa.mock.calls[1]).toMatchSnapshot();
    expect(execa.mock.calls[2]).toMatchSnapshot();
});
