const validateEnvironmentVariables = require('./validateEnvironmentVariables');

test('should throw if any of the required environment variables are missing', () => {
    try {
        validateEnvironmentVariables();
    } catch (error) {
        expect(error.toString()).toMatchSnapshot();
    }
});

test('should return an object with required environment variables', () => {
    process.env.AWS_ACCOUNT_ID = '1234';
    process.env.AWS_ACCESS_KEY_ID = 'account_id';
    process.env.AWS_SECRET_ACCESS_KEY = 'a_password';

    expect(validateEnvironmentVariables()).toMatchSnapshot();
});
