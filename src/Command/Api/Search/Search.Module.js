const { SlashCommandBuilder } = require('@discordjs/builders');

const SearchService = require('./Search.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('search')
            .setDescription('جستوجو و پیدا کردن غزل مورد نظر دربین غزلیات حافظ')
            .addStringOption((Option) => Option
                .setName('keyword')
                .setDescription('محتوا و کلیدواژه موردنظر شما')
            ),

        defer: true,

        service: new SearchService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
