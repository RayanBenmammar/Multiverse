const buildServer = require('./build-server.js');
const logger = require('./utils/logger.js');
const connectDB = require('./utils/connectionDB');

connectDB();

buildServer( (server) => logger.info(`Server is listening on port ${server.address().port}`));
