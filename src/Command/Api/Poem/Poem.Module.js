const { SlashCommandBuilder } = require('@discordjs/builders');

const PoemService = require('./Poem.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('poem')
            .setDescription('غزلیات حافظ بزرگترین غزل سرای جهان')
            .addStringOption((Option) => Option
                .setName('number')
                .setDescription('شماره غزل مورد نظر')
                .setRequired(false)
            )
            .addStringOption((Option) => Option
                .setName('words')
                .setDescription('معنی کلمه به کلمه و کامل غزل')
                .addChoice('نباشد', 'false')
                .addChoice('باشد', 'true')
                .setRequired(false)
            )
            .addStringOption((Option) => Option
                .setName('meaning')
                .setDescription('معنی و مفهوم غزل')
                .addChoice('نباشد', 'false')
                .addChoice('باشد', 'true')
                .setRequired(false)
            )
            .addStringOption((Option) => Option
                .setName('explanation')
                .setDescription('تجذیه و تحلیل کامل غزل')
                .addChoice('نباشد', 'false')
                .addChoice('باشد', 'true')
                .setRequired(false)
            )
            .addStringOption((Option) => Option
                .setName('perception')
                .setDescription('فال و معنی غزل به زبان امروز')
                .addChoice('نباشد', 'false')
                .addChoice('باشد', 'true')
                .setRequired(false)
            ),

        defer: true,

        service: new PoemService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
