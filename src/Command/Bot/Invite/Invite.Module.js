const { SlashCommandBuilder } = require('@discordjs/builders');

const InviteService = require('./Invite.Service');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('invite')
            .setDescription('لینک اینوایت ربات'),

        service: new InviteService(),

        async execute(Interaction)
        {
            await this.service.send(Interaction);
        }
    };
