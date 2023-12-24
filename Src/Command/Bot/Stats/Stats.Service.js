const PrettyMilliseconds = require("pretty-ms");
const { MessageEmbed, MessageActionRow, MessageButton, version } = require('discord.js');

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
                    .setCustomId(Interaction.id + '_PAGE_STATS_REFRESH')
                    .setEmoji('<:RepeatIcon:941290998171045928>')
                    .setStyle(process.env.BUTTON_STYLE)
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: `اطلاعات ربات دیسکورد حافظ لایو`
                })
            .addFields(
                {
                    name: 'وضعیت ربات',
                    value: '```' + Interaction.client.presence.status + '```',
                    inline: true,
                },
                {
                    name: 'مدت فعال بودن',
                    value: '```' + PrettyMilliseconds(Interaction.client.ws.client.uptime) + '```',
                    inline: true,
                },
                {
                    name: 'تعداد سرور ها',
                    value: '```' + Interaction.client.guilds.cache.size + '```',
                    inline: true,
                },
            )
            .addFields(
                {
                    name: 'نسخه ربات',
                    value: '```' + 'v' + require('../../../../package.json').version + '```',
                    inline: true,
                },
                {
                    name: 'نسخه دیسکورد جی‌اس',
                    value: '```' + 'v' + version + '```',
                    inline: true,
                },
                {
                    name: 'نسخه نود جی‌اس',
                    value: '```' + process.version + '```',
                    inline: true,
                },
                {
                    name: 'تعداد کامند ها',
                    value: '```' + Interaction.client.CommandArray.length + '```',
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
            if (Event.customId === (Interaction.id + 'PAGE_STATS_REFRESH'))
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
