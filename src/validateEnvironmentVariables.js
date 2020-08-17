const USER_ENVIRONMENT = [
    'AWS_ACCOUNT_ID',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
];

const getMissingVariables = (entries) => {
    const missingKeys = entries
        .map(([key, value]) => !value && key)
        .filter(Boolean);

    if (missingKeys.length > 0) {
        throw new Error(
            `Could not find value(s) in environment for: \n${missingKeys.join(
                '\n'
            )}`
        );
    }
};

const getEnvironmentEntries = (environmentKeys) =>
    environmentKeys.map((key) => [key, process.env[key]]);

const validateEnvironmentVariables = () => {
    const environmentVariablesEntries = getEnvironmentEntries(USER_ENVIRONMENT);
    getMissingVariables(environmentVariablesEntries);

    return Object.fromEntries(environmentVariablesEntries);
};

module.exports = validateEnvironmentVariables;
