const { SlashCommandBuilder } = require('@discordjs/builders');

const SupportService = require('./Support.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('support')
            .setDescription('Hafez Bot support discord server!'),

        service: new SupportService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
