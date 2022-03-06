const { SlashCommandBuilder } = require('@discordjs/builders');

const HelpService = require('./Help.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('help')
            .setDescription('Hafez Bot help menu!'),

        service: new HelpService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    }
