const { Schema, model } = require('mongoose');

const PoemSchema = new Schema(
    {
        id: String,
        title: String,
        words: String,
        content: String,
        meaning: String,
        perception: String,
        explanation: String
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

PoemSchema.index({ title: 'text', words: 'text',  content: 'text', meaning: 'text', perception: 'text', explanation: 'text' });

module.exports.PoemEntity = model('Poem', PoemSchema);
