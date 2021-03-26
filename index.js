const handlerFactory = require('./src/handlerFactory');
const core = require('@actions/core');

handlerFactory().catch((error) => core.setFailed(error.message));
