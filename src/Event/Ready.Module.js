const Logger = require('../Service/Logger.Service');

module.exports =
    {
        name: 'ready',
        once: true,

        async execute(Args, Client)
        {
            Client.user.setActivity('Hafez Poems', { type: 'WATCHING' });

            Logger.info(`Bot is Logged in as ${ Client.user.tag }`);
        }
    };
