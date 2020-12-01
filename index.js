const core = require('@actions/core');
const { mapValues, keyBy } = require('lodash');
const validateEnvironmentVariables = require('./src/validateEnvironmentVariables');
const runCdkCommands = require('./src/cdkCommands');
const USER_INPUT = [
    'AWS_REGION',
    'AWS_ROLE_NAME',
    'AWS_STACK_NAME',
    'INFRASTRUCTURE_PATH',
    'SKIP_BOOTSTRAP',
];

(async () => {
    try {
        const userEnvironment = validateEnvironmentVariables();

        const userInput = mapValues(keyBy(USER_INPUT), core.getInput);

        await runCdkCommands({ ...userEnvironment, ...userInput });
    } catch (error) {
        core.setFailed(error.message);
    }
})();
