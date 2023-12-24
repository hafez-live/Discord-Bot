const { MessageActionRow, MessageEmbed, MessageSelectMenu  } = require('discord.js');

class HelpService
{
    constructor(Type)
    {
        if (Type !== 'PAGE_ERROR')
        {
            const ErrorService = require('../../../Service/Error.Service');

            this.errorService = new ErrorService();
        }
    }

    async structure(Interaction, Type, Event)
    {
        this.helpRow = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(Interaction.id + '_HELP_MENU')
                    .setPlaceholder('منو راهنمایی ربات حافظ لایو')
                    .addOptions(
                        [
                            {
                                description: 'غزلیات، گالری تصاویر، زندگی نامه، جستوجو غزلیات حافظ',
                                label: 'وبسرویس',
                                value: 'PAGE_HELP_MENU_1'
                            },
                            {
                                description: 'منو راهنمایی، لینک اینوایت، پینگ ربات، اطلاعات ربات',
                                label: 'سرویس ربات',
                                value: 'PAGE_HELP_MENU_2'
                            }
                        ])
            );

        this.helpEmbed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setDescription(
                `**سلام به شما**

                     به جامه حافظ لایو خوش آمدید
                     با این منو شما میتوانید تمام ویژگی ها و کابرد های ربات را بررسی کنید
                    `)
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();

        if (Type === 'PAGE_ERROR')
        {
            await Event.update({ embeds: [ this.helpEmbed ], components: [ this.helpRow ] });

            return await this.menuCollector(Interaction);
        }
    }

    async menuCollector(Interaction)
    {
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 240000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === Interaction.id + '_HELP_MENU')
            {
                switch (Event.values[0])
                {
                    case 'PAGE_HELP_MENU_1':
                    {
                        this.helpRow.components[0].setDisabled(true)
                        this.helpRow = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(Interaction.id + '_HELP_MENU')
                                    .setPlaceholder('منو راهنمایی ربات حافظ لایو')
                                    .addOptions(
                                        [
                                            {
                                                default: true,
                                                description: 'غزلیات، گالری تصاویر، زندگی نامه، جستوجو غزلیات حافظ',
                                                label: 'وبسرویس',
                                                value: 'PAGE_HELP_MENU_1'
                                            },
                                            {
                                                description: 'منو راهنمایی، لینک اینوایت، پینگ ربات، اطلاعات ربات',
                                                label: 'سرویس ربات',
                                                value: 'PAGE_HELP_MENU_2'
                                            }
                                        ])
                            );

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'منو راهنمایی ربات حافظ لایو'
                                })
                            .addFields(
                                {
                                    name: '**زندگینامه حافظ:**',
                                    value: '``` /biography ```'
                                },
                                {
                                    name: '**گالری تصاویر حافظ:**',
                                    value: '``` /gallery ```'
                                },
                                {
                                    name: '**غزلیات حافظ:**',
                                    value: '``` /poem number: <poem number> words: <choice option> meaning: <choice option> perception: <choice option> explanation: <choice option> ```'
                                },
                                {
                                    name: '**جستوجو در غزلیات حافظ:**',
                                    value: '``` /search type: <user || tutorial> keyword: <search query> ```'
                                }
                            )
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                    case 'PAGE_HELP_MENU_2':
                    {
                        this.helpRow = new MessageActionRow()
                            .addComponents(
                                new MessageSelectMenu()
                                    .setCustomId(Interaction.id + '_HELP_MENU')
                                    .setPlaceholder('منو راهنمایی ربات حافظ لایو')
                                    .addOptions(
                                        [
                                            {
                                                description: 'غزلیات، گالری تصاویر، زندگی نامه، جستوجو غزلیات حافظ',
                                                label: 'وبسرویس',
                                                value: 'PAGE_HELP_MENU_1'
                                            },
                                            {
                                                default: true,
                                                description: 'منو راهنمایی، لینک پشتیبانی و اینوایت، پینگ ربات، اطلاعات ربات',
                                                label: 'سرویس ربات',
                                                value: 'PAGE_HELP_MENU_2'
                                            }
                                        ])
                            );

                        const HelpEmbed = new MessageEmbed()
                            .setColor(process.env.EMBED_COLOR)
                            .setThumbnail(process.env.FAVICON)
                            .setAuthor(
                                {
                                    name: 'منو راهنمایی ربات حافظ لایو'
                                })
                            .addFields(
                                {
                                    name: '**منو راهنمایی:**',
                                    value: '``` /help ```',
                                    inline: true
                                },
                                {
                                    name: '**لینک اینوایت:**',
                                    value: '``` /invite ```',
                                    inline: true
                                },
                                {
                                    name: '**پینگ ربات:**',
                                    value: '``` /ping```',
                                    inline: true
                                },
                                {
                                    name: '**اطلاعات ربات:**',
                                    value: '``` /bot-stats ```',
                                    inline: true
                                },
                                {
                                    name: '**پشتیبانی ربات:**',
                                    value: '``` /support ```',
                                    inline: true
                                }
                            )
                            .setFooter(
                                {
                                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                                    iconURL: process.env.FAVICON
                                })
                            .setTimestamp();

                        await Event.update({ embeds: [ HelpEmbed ], components: [ this.helpRow ] });

                        break;
                    }
                }
            }
        });
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);
            await this.menuCollector(Interaction);

            return await Interaction.reply({ embeds: [ this.helpEmbed ], components: [ this.helpRow ] });
        }
        catch (Error)
        {
            return await this.errorService.send(Interaction);
        }
    }
}

module.exports = HelpService;
