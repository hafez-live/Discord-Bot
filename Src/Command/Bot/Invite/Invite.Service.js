const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class InviteService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async structure()
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('دسترسی کامل')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.FULL_PERMISSION_INVITE_LINK)
                    .setStyle('LINK'),

                new MessageButton()
                    .setLabel('دسترسی استاندارد')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.STANDARD_PERMISSION_INVITE_LINK)
                    .setStyle('LINK'),

                new MessageButton()
                    .setLabel('بدون دسترسی')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.ZERO_PERMISSION_INVITE_LINK)
                    .setStyle('LINK')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: 'لینک اینوایت ربات دیسکورد حافظ لایو'
                })
            .addFields(
                {
                    name: 'دسترسی کامل',
                    value: `[لینک](${process.env.FULL_PERMISSION_INVITE_LINK})`
                },
                {
                    name: 'دسترسی استاندارد',
                    value: `[لینک](${process.env.STANDARD_PERMISSION_INVITE_LINK})`
                },
                {
                    name: 'بدون دسترسی',
                    value: `[لینک](${process.env.ZERO_PERMISSION_INVITE_LINK})`
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async send(Interaction)
    {
        try
        {
            await this.structure();

            if (!this.error)
            {
                return Interaction.reply({ embeds: [ this.embed ], components :[ this.row ]});
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

module.exports = InviteService;
