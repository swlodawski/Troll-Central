const {ObjectId} = require('mongoose').Types;
const {json} = require('express');
const {Thought, User} = require('../models');
const { get } = require('../models/Reaction');
const { updateOne } = require('../models/User');

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

    async deleteThought(req, req) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if(!thought) {
                res.status(404).json({message: 'This thought does not exist'});
            }

            const dbThought = await User.findOneAndDelete(
                {thoughts: req.params.thoughtId},
                {$pull: { thoughts: req.params.thoughtId}},
                {new: true}
            );

            if(!dbThought) {
                res.status(404).json({message: 'Thought Deleted'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId}, {
                $set: req.body
            });

            if(!thought) {
                res.status(404).json({message: 'Thought doe not exist'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, next: true}
            );
            if(!thought) {
                res.status(404).json({message: 'Thought does not exist'});
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.body.thoughtId },
                {$pull: {reaction: {_id: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if(!thought) {
                res.status(404).json({message: 'Thought does not exist.'});
            } res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

};
