const { SlashCommandBuilder } = require('@discordjs/builders');

const SupportService = require('./Support.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('support')
            .setDescription('سرور پشتیبانی ربات دیسکورد حافظ لایو'),

        service: new SupportService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
