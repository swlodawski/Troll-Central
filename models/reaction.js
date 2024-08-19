const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    { 
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // REACTION SCHEMA
        // reactionid
        // Mongoose objectdata type and def new object id

        reactionBody: {

        },
        // reaction body
        // String
        // Required
        // 280 char min
    }
)





// username
// String
// Required


// createdAt
// Set default timestamp value to now
// use getter method to format timestamp on query