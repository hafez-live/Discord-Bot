const { SlashCommandBuilder } = require('@discordjs/builders');

const GalleryService = require('./Gallery.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('gallery')
            .setDescription('Get some nice Hafez photos!'),

        defer: true,

        service: new GalleryService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
