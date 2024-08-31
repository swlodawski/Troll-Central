// const {Schema, model} = require('mongoose');
// const reactionSchema = require('./Reaction');

// const thoughtSchema = new Schema( 
// {    
//     thoughtText: {
//         type: String,
//         required: true,
//         min_length: 1,
//         max_length: 200,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     username: {
//         type: String,
//         required: true,
//     },
//     reaction: [reactionSchema],
// },
// {
//     toJSON: {
//         getters: true,
//     },
//     id: false
// }
// );

// thoughtSchema.virtual('reactionCount').get(
//     function() {
//         return this.reaction.length
//     }
// )

// const Thought = model('thought', thoughtSchema);

// module.exports = Thought;
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false
      }
);

// A virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(
    function() {
        return this.reactions.length
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;