// Thought Text
// String
// Required
// Min 1 max 280 chars

// Created_At
// Date
// Set default for current time stamp
// User better method for time format of timestamp on query

// username(of person creating thought)
// String
// Required

// reactions (like replies)
// Array of nested docs created with reactionschema.

// Virtuals that retrieves the reactioncount and length of reactions array in query.


// Schema Reqs

// reactionId
// Use mongoose object id data type
// Default value is set to objectId

// ReactionBody
// String
// Required
// 280 Chars

// username
// String
// Required

// createdAt
// Date
// Set default value to current in timestamp
// Use getter method to format timestamp on query