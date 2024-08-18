const {Schema, Types} = require('mongoose');
// username reqs-
// String
// Inique
// Required
// Trimmed
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
        email: {
            type: String,
            unique: true,
            // Research Validation
        },
        friends: [friendsSchema],

// email
// String
// Unique
// Cross refences the email for validation 'matching validation'

// thoughts array
// Array id references the thought model

// friends array
//  references the user model

// Create virtual that can ref friend count and retrive the length of friends in query
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const user = model('user', userSchema);