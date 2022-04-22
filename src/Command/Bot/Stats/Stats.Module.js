const { SlashCommandBuilder } = require('@discordjs/builders');

const StatsService = require('./Stats.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('bot-stats')
            .setDescription('اطلاعات ربات دیسکورد حافظ شیرازی'),

        service: new StatsService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
