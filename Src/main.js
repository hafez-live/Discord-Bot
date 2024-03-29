const Path = require('path');
const DotEnv = require('dotenv');

DotEnv.config({ path: Path.resolve('Config', 'Config.env') });

const ClientService = require('./Service/Client.Service');

function Bootstrap()
{
    const Client = new ClientService();

    Client.start();
}

Bootstrap();
