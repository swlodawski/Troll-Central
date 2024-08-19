const {Schema, model} = require('mongoose');
const { thoughts } = require('.');

const userSchema = new Schema(
    { 
        userName: {
            type: String.trim(),
            unique: true,
            required: true, 
        },
        // username reqs-
        // String
        // Inique
        // Required
        // Trimmed
        email: {
            type: String,
            unique: true,
            // Research Validation
            // email
            // String
            // Unique
            // Cross refences the email for validation 'matching validation'
        },
        thoughts: {

        },
        friends: {

        },
        // friends array
        //  references the user model
        // 
        // 
        // 

        // Create virtual that can ref friend count and retrive the length of friends in query


        // thoughts array
        // Array id references the thought model
    },
);

const user = model('user', userSchema);

module.exports = user;