const core = require('@actions/core');
const { mapValues, keyBy } = require('lodash');
const validateEnvironmentVariables = require('./validateEnvironmentVariables');
const runCdkCommands = require('./cdkCommands');
const USER_INPUT = [
    'AWS_REGION',
    'AWS_ROLE_NAME',
    'AWS_STACK_NAME',
    'CUSTOM_BOOTSTRAP_ARGUMENTS',
    'CUSTOM_DEPLOY_ARGUMENTS',
    'INFRASTRUCTURE_PATH',
    'SKIP_BOOTSTRAP',
];

const handlerFactory = async () => {
    const userEnvironment = validateEnvironmentVariables();
    const userInput = mapValues(keyBy(USER_INPUT), core.getInput);

    return runCdkCommands({ ...userEnvironment, ...userInput });
};

module.exports = handlerFactory;
