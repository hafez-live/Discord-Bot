const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class StatsService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async structure(Interaction)
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('PAGE_PING_REFRESH')
                    .setEmoji('<:RepeatIcon:941290998171045928>')
                    .setStyle(process.env.BUTTON_STYLE)
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: 'پینگ ربات و وبسوکت دیسکورد'
                })
            .addFields(
                {
                    name: 'وبسوکت دیسکورد',
                    value: '```' + Interaction.client.ws.ping + 'ms' + '```',
                    inline: true,
                },
                {
                    name: 'کلاینت ربات',
                    value: '```' + (Date.now() - Interaction.createdTimestamp) + 'ms' + '```',
                    inline: true,
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async buttonCollector(Interaction)
    {
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_PING_REFRESH')
            {
                await this.structure(Interaction);

                return await Event.update({ embeds: [ this.embed ], components: [ this.row ] });
            }
        });
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);
            await this.buttonCollector(Interaction);

            if (!this.error)
            {
                return Interaction.reply({ embeds: [ this.embed ], components : [ this.row ] });
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }
}

module.exports = StatsService;
