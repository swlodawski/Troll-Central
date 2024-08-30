const {ObjectId} = require('mongoose').Types;
const {json} = require('express');
const {Thought, User} = require('../models');

const headCount = async() => {
    const numberOfThoughts = await Thought.aggregate()
    .count('thoughtCount');
    return numberOfThoughts;
}

// Aggregate function for getting the overall grade using $avg
// const grade = async (thoughtId) =>
//   Thought.aggregate([
//     // only include the given thought by using $match
//     { $match: { _id: new ObjectId(thoughtId) } },
//     {
//       $unwind: '$reactions',
//     },
//     {
//       $group: {
//         _id: new ObjectId(thoughtId),
//         overallGrade: { $avg: '$reactions.score' },
//       },
//     },
//   ]);

module.exports = {
    
}
