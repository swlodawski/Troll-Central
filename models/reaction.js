const {Schema, Types} = require('mongoose');
const { reaction } = require('.');

const reactionSchema = new Schema(
    { 
       reactionBody: {
        type: String,
        required: true,
        max_length: 200
       },
       username: {
        type: String,
        required: true
       },
       createdAt: {
        type: Date,
        default: Date.now
       }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

module.exports = reactionSchema;