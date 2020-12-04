const execa = require('execa');
jest.mock('execa');
const moveGitTag = require('./move-git-tag');

test('should execute git commands', async () => {
    process.env.GITHUB_TOKEN = '123';
    process.env.GITHUB_REPOSITORY = 'some-name';

    await moveGitTag();
    expect(execa.mock.calls[0]).toMatchSnapshot();
    expect(execa.mock.calls[1]).toMatchSnapshot();
    expect(execa.mock.calls[2]).toMatchSnapshot();
});
