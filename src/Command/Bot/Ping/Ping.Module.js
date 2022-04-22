const { SlashCommandBuilder } = require('@discordjs/builders');

const PingService = require('./Ping.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('پینگ ربات و وبسوکت دیسکورد'),

        service: new PingService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
