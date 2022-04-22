const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

const Logger = require('./Logger.Service');
const HelpService = require('../Command/Bot/Help/Help.Service');

class ErrorService
{
    constructor()
    {
        this.helpService = new HelpService('PAGE_ERROR');
    }

    async structure(Interaction, Title, Description)
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('راهنمایی')
                    .setCustomId(Interaction.id + 'PAGE_HELP')
                    .setEmoji('<:MotherboardWitheIcon:941210207458058271>')
                    .setStyle(process.env.BUTTON_STYLE)
            );

        this.embed = new MessageEmbed()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter(
                {
                    text: process.env.EMBED_ERROR_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setColor(process.env.EMBED_COLOR)
            .setTimestamp();
    }

    async buttonCollector(Interaction)
    {
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === (Interaction.id + 'PAGE_HELP'))
            {
                await this.helpService.structure(Interaction, 'PAGE_ERROR', Event);
            }
        });
    }

    async send(Interaction, Title, Description)
    {
        try
        {
            await this.structure(Interaction, Title || 'خطا در سرویس', Description || 'این ارور از طرف سرویس ربات ما است با ریپورت آن مارا از این ارور با خبر کنید تا سریعا فیکس شود.');
            await this.buttonCollector(Interaction);

            return await Interaction.followUp({ embeds: [ this.embed ], components : [ this.row ] });
        }
        catch (Error)
        {
            Logger.error(Error);

            await this.structure(Interaction, 'خطا در سرویس', 'این ارور از طرف سرویس ربات ما است با ریپورت آن مارا از این ارور با خبر کنید تا سریعا فیکس شود.');
            await this.buttonCollector(Interaction);

            return await Interaction.followUp({ embeds: [ this.embed ], components : [ this.row ] });
        }
    }
}

module.exports = ErrorService;
