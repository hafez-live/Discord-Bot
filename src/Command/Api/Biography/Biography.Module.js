const { SlashCommandBuilder } = require('@discordjs/builders');

const BiographyService = require('./Biography.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('biography')
            .setDescription('Get Hafez biography!'),

        defer: true,

        service: new BiographyService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
