const { MessageEmbed } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class BiographyService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async structure(Interaction)
    {
        try
        {
            if (!this.error)
            {
                this.biographyEmbed = new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setAuthor(
                        {
                            name: 'زندگی نامه حافظ'
                        })
                    .setDescription(
                        `: زندگی نامه` +
                        `\n` +
                        `> خواجه شمس‌ُالدّینْ محمّدِ بن بهاءُالدّینْ محمّدْ حافظ شیرازی (زادهٔ ۷۲۷ هجری قمری – درگذشتهٔ ۷۹۲ هجری قمری در شیراز)، ملقب به لِسان‌ُالْغِیْب، تَرجُمانُ الْاَسرار، لِسان‌ُالْعُرَفا و ناظِم‌ُالاُولیاء، شاعر سدهٔ هشتم هجری ایران است. بیش‌تر شعرهای او غزل هستند که به غزلیات شهرت دارند.`
                    )
                    .addFields(
                        {
                            name: ': تولد',
                            value: '۷۰۶'
                        },
                        {
                            name: ': فوت',
                            value: '۷۶۹'
                        },
                        {
                            name: ': دیوان اشعار',
                            value: 'دیوان حافظ'
                        },
                        {
                            name: ': محل خاکسپاری',
                            value: 'شیراز'
                        })
                    .setImage(process.env.IMAGE_LINK)
                    .setFooter(
                        {
                            text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON
                        })
                    .setTimestamp();
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async send(Interaction)
    {
        try
        {
            await this.structure(Interaction);

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.biographyEmbed ] });
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

module.exports = BiographyService;
