const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class WebsiteService
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
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.WEBSITE_LINK)
                    .setStyle('LINK')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: 'لینک وبسایت ربات دیسکورد حافظ لایو'
                })
            .addFields(
                {
                    name: 'لینک وبسایت',
                    value: `[لینک](${process.env.WEBSITE_LINK})`,
                    inline: true,
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_WEB_COMMANDS_FOOTER,
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

module.exports = WebsiteService;
