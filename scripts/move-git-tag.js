const execa = require('execa');
const { version } = require('../package.json');

const getCurrentVersion = () => {
    return version.split('.')[0];
};

const buildRepoUrl = () => {
    return [
        'https://x-access-token:',
        process.env.GITHUB_TOKEN,
        '@github.com/',
        process.env.GITHUB_REPOSITORY,
        '.git',
    ].join('');
};

const moveGitTag = async () => {
    const version = getCurrentVersion();

    if (!version) {
        throw new Error('Could not find version.');
    }

    const repository = buildRepoUrl();
    const tagName = `v${version}`;
    await execa('git', ['push', repository, '--delete', tagName]);
    await execa('git', ['tag', '-f', tagName]);
    await execa('git', ['push', repository, 'main', '--tags']);
};

module.exports = moveGitTag;
