#!/usr/bin/env node

const moveGitTag = require('./move-git-tag');

moveGitTag().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
