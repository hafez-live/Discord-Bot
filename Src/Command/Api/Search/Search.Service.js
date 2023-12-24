const PoemService = require('../Poem/Poem.Service');
const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const PoemMongoRepository = require('../Poem/Repositories/Poem.Repository');

class SearchService
{
    constructor()
    {
        this.error = false;
        this.poemService = new PoemService();
        this.errorService = new ErrorService();
        this.poemRepository = new PoemMongoRepository();
    }

    async data(Interaction)
    {
        this.repository = await this.poemRepository.findOne({ $text: { $search: this.keyword }});

        if (!this.repository.content)
        {
            this.error = true;

            Logger.error(this.response);

            return this.errorService.send(Interaction, 'خطای داخلی وبسرویس');
        }
    }

    async send(Interaction)
    {
        try
        {
            this.keyword = await Interaction.options.getString('keyword');

            if (!this.keyword)
            {
                this.error = true;

                return this.errorService.send(Interaction, 'درخواست اشتباه', 'لطفا کلماتی برای جستجو در بین غزلیات حافظ بنویسید');
            }

            await this.data(Interaction);

            if (!this.error && this.repository.content)
            {
                await this.poemService.send(Interaction, this.response);
            }
            else
            {
                return this.errorService.send(Interaction, 'درخواست اشتباه', 'غزلی با محتوا و کلیدواژه درخواستی شما وجود ندارد');
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

module.exports = SearchService;
