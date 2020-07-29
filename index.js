const core = require('@actions/core');
const _ = require('lodash');
const runCdkCommands = require('./src/cdkCommands');
const USER_INPUT = [
    'AWS_ACCOUNT_ID',
    'AWS_ROLE_NAME',
    'AWS_STACK_NAME',
    'INFRASTRUCTURE_LOCATION',
];

(async () => {
    try {
        const userInput = _.mapValues(_.keyBy(USER_INPUT), core.getInput);
        await runCdkCommands(userInput);
    } catch (error) {
        core.setFailed(error.message);
    }
})();
