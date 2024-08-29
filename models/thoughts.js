const {Schema, model} = require('mongoose');

const reactionSchema = require('./Reaction');
const { reaction } = require('.');

const thoughtsSchema = new Schema( 
{    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 200,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
    },
    reaction: [reactionSchema],
},
{
    toJSON: {
        getters: true,
    },
    id: false
}
);

thoughtsSchema.virtual('reactionCount').get(
    function() {
        return this.reaction.length
    }
)

const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;