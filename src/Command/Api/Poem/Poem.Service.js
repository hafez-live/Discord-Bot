const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const { truncate } = require('../../../Service/Helper.Service');

const PoemMongoRepository = require('./Repositories/Poem.Repository');

class PoemService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
        this.poemRepository = new PoemMongoRepository();
    }

    async data(Interaction)
    {
        try
        {
            this.repository = await this.poemRepository.findRandom();

            if (this.explanationStatus)
            {
                await this.explanation(Interaction);
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction, 'خطا در وب سرویس');
        }
    }

    async content(Interaction)
    {
        try
        {
            this.poemContent = truncate(this.repository.content, 1000);
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async words(Interaction)
    {
        try
        {
            this.poemWords = truncate(this.repository.words, 1000);
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async meaning(Interaction)
    {
        try
        {
            this.poemMeaning = truncate(this.repository.meaning, 1000);
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async perception(Interaction)
    {
        try
        {
            this.poemPerception = truncate(this.repository.perception, 1000);
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async explanation(Interaction)
    {
        try
        {
            this.poemExplanation = truncate(this.repository.explanation, 1000);
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async structure(Interaction)
    {
        try
        {
            if (!this.error)
            {
                this.poemRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_POEM_EXPLANATION')
                            .setLabel('Explanation')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle(process.env.BUTTON_STYLE),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_POEM_REFRESH')
                            .setLabel('Refresh')
                            .setEmoji('<:RepeatIcon:941290998171045928>')
                            .setStyle(process.env.BUTTON_STYLE)
                    );

                this.poemEmbed = new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setAuthor(
                        {
                            name: this.repository.title || ''
                        })
                    .addField(
                        ': غزل :notebook_with_decorative_cover:',
                        this.poemContent || ''
                    )
                    .setImage(process.env.IMAGE_LINK)
                    .setFooter(
                        {
                            text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON
                        })
                    .setTimestamp();

                if (this.explanationStatus)
                {
                    this.poemEmbed.addField(
                        ': شرح غزل :bookmark:',
                        this.poemExplanation || ''
                    )
                }
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
                    case Interaction.id + '_PAGE_POEM_EXPLANATION':
                    {
                        this.explanationStatus = true;

                        await this.data(Interaction);
                        await this.content(Interaction);
                        await this.explanation(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow ] });

                        break;
                    }
                    case Interaction.id + '_PAGE_POEM_REFRESH':
                    {
                        await this.data(Interaction);
                        await this.content(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow ] });
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
            await this.data(Interaction);
            await this.content(Interaction);
            if (Interaction.options.getString('number'))
            {
                this.explanationStatus = true;
                await this.explanation(Interaction);
            }
            if (Interaction.options.getString('keyword'))
            {
                this.explanationStatus = true;
                await this.explanation(Interaction);
            }
            if (Interaction.options.getString('words') === 'باشد')
            {
                this.wordsStatus = true;
                await this.words(Interaction);
            }
            if (Interaction.options.getString('meaning') === 'باشد')
            {
                this.meaningStatus = true;
                await this.meaning(Interaction);
            }
            if (Interaction.options.getString('perception') === 'باشد')
            {
                this.perceptionStatus = true;
                await this.perception(Interaction);
            }
            if (Interaction.options.getString('explanation') === 'باشد')
            {
                this.explanationStatus = true;
                await this.explanation(Interaction);
            }
            await this.structure(Interaction);
            await this.buttonCollector(Interaction);

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.poemEmbed ], components: [ this.poemRow ] });
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

module.exports = PoemService;
