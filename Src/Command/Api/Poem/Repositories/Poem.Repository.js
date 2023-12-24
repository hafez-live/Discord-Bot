const { PoemEntity } = require('../Model/Poem.Entity');

class PoemMongoRepository
{
    async findRandom()
    {
        return await PoemEntity.findOne().limit(1).skip(Math.random() * 496);
    }

    async findMany(params)
    {
        return await PoemEntity.find(params);
    }

    async findOne(params)
    {
        return await PoemEntity.findOne(params);
    }
}

module.exports = PoemMongoRepository;
