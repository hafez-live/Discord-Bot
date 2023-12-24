const { SlashCommandBuilder } = require('@discordjs/builders');

const SupportService = require('./Website.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('website')
            .setDescription('لینک وبسایت ربات دیسکورد حافظ لایو'),

        service: new SupportService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
