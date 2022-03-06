const { connect } = require('mongoose');

const Logger = require('./Logger.Service');

module.exports.ConnectDB = async (Database) =>
{
    try
    {
        await connect(Database);

        Logger.info('MongoDB connection successful');
    }
    catch (Error)
    {
        console.log(Error);
    }
};
