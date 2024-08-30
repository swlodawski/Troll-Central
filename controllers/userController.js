const { json } = require('express');
const {User, Thought} = require('../models');
const { create } = require('../models/Thoughts');
const { updateMany } = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try
         {
            const user = await User.findOne({_id: req.params.userId}).populate('thoughts');

            if(!user) {
                return res.status(404).json({message: 'This user can not be found.'});
            }
            res.json(user);
         } catch (err) {
            res.status(500).json(err);
         }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
                res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});

            if(!user) {
                res.status(404).json({message: "User does not exist with that id"});
            }

            await Thought.deleteMany({_id: { $in: user.thoughts}});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!user) {
                res.status(404).json({message: 'That user does not exist'});
            } res.status(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );

            if(!user) {
                return res.status(404).json({message: "This use does not exist"});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}