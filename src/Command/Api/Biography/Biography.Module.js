const { SlashCommandBuilder } = require('@discordjs/builders');

const BiographyService = require('./Biography.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('biography')
            .setDescription('زندگی نامه، مشخصات، زمان تولد و فوت حافط'),

        defer: true,

        service: new BiographyService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
