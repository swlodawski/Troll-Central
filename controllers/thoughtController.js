const {ObjectId} = require('mongoose').Types;
const {json} = require('express');
const {Thought, User} = require('../models');
const { get } = require('../models/Reaction');

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
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThough(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .select('-_v');

        if(!thought) {
            res.status(404).json({message: 'This thought does not exist'})
        }

        res.json({thought});
        } catch (err) {
            res.status(500).json(err)
        }
    },

    
}
