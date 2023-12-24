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
            if (this.numberStatus)
            {
                this.repository = await this.poemRepository.findOne({ id: Interaction.options.getString('number') });
            }
            else
            {
                this.repository = await this.poemRepository.findRandom();
            }

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
                            .setCustomId(Interaction.id + '_PAGE_POEM_WORDS')
                            .setLabel('کلمات غزل')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle(process.env.BUTTON_STYLE),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_POEM_MEANING')
                            .setLabel('معنی غزل')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle(process.env.BUTTON_STYLE),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_POEM_PERCEPTION')
                            .setLabel('فال غزل')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle(process.env.BUTTON_STYLE),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_POEM_EXPLANATION')
                            .setLabel('شرح غزل')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle(process.env.BUTTON_STYLE)
                    );

                this.poemControllerRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_POEM_RELOAD')
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
                        ': غزل',
                        this.poemContent || ''
                    )
                    .setImage(process.env.IMAGE_LINK)
                    .setFooter(
                        {
                            text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON
                        })
                    .setTimestamp();

                if (this.wordsStatus)
                {
                    this.poemEmbed.addField(
                        ': معنی کلمات غزل',
                        this.poemWords || ''
                    )
                }
                if (this.meaningStatus)
                {
                    this.poemEmbed.addField(
                        ': معنی غزل',
                        this.poemMeaning || ''
                    )
                }
                if (this.perceptionStatus)
                {
                    this.poemEmbed.addField(
                        ': فال غزل',
                        this.poemPerception || ''
                    )
                }
                if (this.explanationStatus)
                {
                    this.poemEmbed.addField(
                        ': شرح غزل',
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
                    case Interaction.id + '_PAGE_POEM_WORDS':
                    {
                        this.wordsStatus = true;

                        if (this.wordsStatus)
                        {
                            this.wordsStatus = true;
                            await this.words(Interaction);
                        }
                        if (this.meaningStatus)
                        {
                            this.meaningStatus = true;
                            await this.meaning(Interaction);
                        }
                        if (this.perceptionStatus)
                        {
                            this.perceptionStatus = true;
                            await this.perception(Interaction);
                        }
                        if (this.explanationStatus)
                        {
                            this.explanationStatus = true;
                            await this.explanation(Interaction);
                        }
                        await this.content(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow, this.poemControllerRow ] });

                        break;
                    }
                    case Interaction.id + '_PAGE_POEM_MEANING':
                    {
                        this.meaningStatus = true;

                        if (this.wordsStatus)
                        {
                            this.wordsStatus = true;
                            await this.words(Interaction);
                        }
                        if (this.meaningStatus)
                        {
                            this.meaningStatus = true;
                            await this.meaning(Interaction);
                        }
                        if (this.perceptionStatus)
                        {
                            this.perceptionStatus = true;
                            await this.perception(Interaction);
                        }
                        if (this.explanationStatus)
                        {
                            this.explanationStatus = true;
                            await this.explanation(Interaction);
                        }
                        await this.content(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow, this.poemControllerRow ] });

                        break;
                    }
                    case Interaction.id + '_PAGE_POEM_PERCEPTION':
                    {
                        this.perceptionStatus = true;

                        if (this.wordsStatus)
                        {
                            this.wordsStatus = true;
                            await this.words(Interaction);
                        }
                        if (this.meaningStatus)
                        {
                            this.meaningStatus = true;
                            await this.meaning(Interaction);
                        }
                        if (this.perceptionStatus)
                        {
                            this.perceptionStatus = true;
                            await this.perception(Interaction);
                        }
                        if (this.explanationStatus)
                        {
                            this.explanationStatus = true;
                            await this.explanation(Interaction);
                        }
                        await this.content(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow, this.poemControllerRow ] });

                        break;
                    }
                    case Interaction.id + '_PAGE_POEM_EXPLANATION':
                    {
                        this.explanationStatus = true;

                        if (this.wordsStatus)
                        {
                            this.wordsStatus = true;
                            await this.words(Interaction);
                        }
                        if (this.meaningStatus)
                        {
                            this.meaningStatus = true;
                            await this.meaning(Interaction);
                        }
                        if (this.perceptionStatus)
                        {
                            this.perceptionStatus = true;
                            await this.perception(Interaction);
                        }
                        if (this.explanationStatus)
                        {
                            this.explanationStatus = true;
                            await this.explanation(Interaction);
                        }
                        await this.content(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow, this.poemControllerRow ] });

                        break;
                    }
                    case Interaction.id + '_PAGE_POEM_RELOAD':
                    {
                        if (this.wordsStatus)
                        {
                            this.wordsStatus = true;
                            await this.words(Interaction);
                        }
                        if (this.meaningStatus)
                        {
                            this.meaningStatus = true;
                            await this.meaning(Interaction);
                        }
                        if (this.perceptionStatus)
                        {
                            this.perceptionStatus = true;
                            await this.perception(Interaction);
                        }
                        if (this.explanationStatus)
                        {
                            this.explanationStatus = true;
                            await this.explanation(Interaction);
                        }
                        await this.data(Interaction);
                        await this.content(Interaction);
                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.poemEmbed ], components: [ this.poemRow, this.poemControllerRow ] });
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

    async send(Interaction, Data)
    {
        try
        {
            if (Data)
            {
                this.repository = Data;
            }
            else
            {
                if (Interaction.options.getString('number'))
                {
                    this.numberStatus = true;
                }
                if (Interaction.options.getString('words') === 'true')
                {
                    this.wordsStatus = true;
                    await this.words(Interaction);
                }
                if (Interaction.options.getString('meaning') === 'true')
                {
                    this.meaningStatus = true;
                    await this.meaning(Interaction);
                }
                if (Interaction.options.getString('perception') === 'true')
                {
                    this.perceptionStatus = true;
                    await this.perception(Interaction);
                }
                if (Interaction.options.getString('explanation') === 'true')
                {
                    this.explanationStatus = true;
                    await this.explanation(Interaction);
                }

                await this.data(Interaction);
            }

            await this.content(Interaction);
            await this.structure(Interaction);
            await this.buttonCollector(Interaction);

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.poemEmbed ], components: [ this.poemRow, this.poemControllerRow ] });
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
