const { SlashCommandBuilder } = require('@discordjs/builders');

const HelpService = require('./Help.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('منو راهنمایی ربات'),

        service: new HelpService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    }
