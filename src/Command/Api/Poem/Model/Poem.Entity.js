const { Schema, model } = require('mongoose');

const PoemSchema = new Schema(
    {
        id: String,
        title: String,
        words: String,
        content: String,
        meaning: String,
        explanation: String,
        perception: String
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

module.exports.PoemEntity = model('Poem', PoemSchema);
