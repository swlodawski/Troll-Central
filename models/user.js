const {Schema, Types} = require('mongoose');

const userSchema = new Schema(
    { 
        userID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
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
        friends: [friendsSchema],
        // friends array
        //  references the user model
        // 
        // 
        // 

        // Create virtual that can ref friend count and retrive the length of friends in query


        // thoughts array
        // Array id references the thought model
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const user = model('user', userSchema);