const { SlashCommandBuilder } = require('@discordjs/builders');

const GalleryService = require('./Gallery.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('gallery')
            .setDescription('گنجینه ای از بهترین و با کیفیت ترین عکس ها از حافظ، حافظیه و دیوان اشعار حافظ'),

        defer: true,

        service: new GalleryService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
