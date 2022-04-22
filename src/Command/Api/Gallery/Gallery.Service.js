const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class GalleryService
{
    constructor()
    {
        this.currentEmbed = 1;
        this.currentArray = 0;
        this.error = false;
        this.errorService = new ErrorService();
        this.photos =
            [
                'https://cdn.discordapp.com/attachments/760896469023850588/832576634489929728/782482961-talab-org.jpg',
                'https://www.packtoiran.com/media/ckeditor/20210114-074634-2046-2.jpg',
                'https://www.tappersia.com/wp-content/uploads/2019/06/Hafez-PersianPoet.jpg',
                'https://tappersia.com/wp-content/uploads/2019/06/12806152_1543147449316754_8797338904518522491_n.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/d/d0/Hafez_Tomb_1.jpg',
                'https://www.aljazeera.com/wp-content/uploads/2020/06/3ab6dfa691634107b5617e5d85b21f83_18.jpeg?resize=770%2C513',
                'https://cdna.artstation.com/p/assets/images/images/034/756/404/large/mirzabeygi-52.jpg?1613132478',
                'https://amuraworld.com/images/articles/134-iran/116-hafez/118-pintura1.jpg',
                'https://amuraworld.com/images/articles/134-iran/01-full/116-hafez.jpg',
                'https://learnpersian.us/uploads/2019/10/tomh-of-hafez-shiraz.jpg',
                'https://cdn.discordapp.com/attachments/760896469023850588/832576633667715112/1.jpg',
                'https://cdn.discordapp.com/attachments/760896469023850588/832577287551451177/1660401.jpg',
                'https://cdn.discordapp.com/attachments/760896469023850588/832577287693533194/e67ebce5d3751d45.png',
                'https://cdn.discordapp.com/attachments/760896469023850588/832576633901678602/b5759593fdad5a8d.jpg',
                'https://cdn.discordapp.com/attachments/760896469023850588/832576634078625832/ef6cdaaf78ea9696.jpg',
                'https://cdn.discordapp.com/attachments/760896469023850588/832576634279428136/Hamgardi_0349zvzbc89_resize.jpg'
            ];
    }

    async structure(Interaction)
    {
        try
        {
            if (!this.error)
            {
                this.galleryRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(Interaction.id + '_PREVIOUS_PAGE_GALLERY')
                            .setEmoji('<:Left:849352126881857538>')
                            .setStyle(process.env.BUTTON_STYLE),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_NEXT_PAGE_GALLERY')
                            .setEmoji('<:Right:849352129381531668>')
                            .setStyle(process.env.BUTTON_STYLE)
                    );


                this.galleryEmbed = new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setAuthor(
                        {
                            name:`(${this.currentEmbed}/${this.photos.length}) گالری عکس های حافظ `
                        })
                    .setDescription('> گنجینه ای از بهترین و با کیفیت ترین عکس ها از حافظ، حافظیه و دیوان اشعار حافظ')
                    .setThumbnail('https://cdn.quotesgram.com/img/83/72/565743124-Hafiz_Shirazi_-_Hafez_Shirazi_Biography.jpg')
                    .setImage(this.photos[this.currentArray])
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

    async buttonCollector(Interaction)
    {
        try
        {
            this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

            this.collector.on('collect', async (Event) =>
            {
                switch (Event.customId)
                {
                    case Interaction.id + '_PREVIOUS_PAGE_GALLERY':
                    {
                        if (this.currentEmbed > 1)
                        {
                            this.currentEmbed--;
                            this.currentArray--;
                        }
                        else
                        {
                            this.currentEmbed = this.photos.length;
                            this.currentArray = this.photos.length - 1;
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.galleryEmbed ], components: [ this.galleryRow ] });

                        break;
                    }
                    case Interaction.id + '_NEXT_PAGE_GALLERY':
                    {
                        if (this.currentEmbed === this.photos.length)
                        {
                            this.currentEmbed = 1;
                            this.currentArray = 0;
                        }
                        else
                        {
                            this.currentEmbed++;
                            this.currentArray++;
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.galleryEmbed ], components: [ this.galleryRow ] });

                        break;
                    }
                }
            });
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
            await this.buttonCollector(Interaction);

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.galleryEmbed ], components: [ this.galleryRow ] });
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

module.exports = GalleryService;
