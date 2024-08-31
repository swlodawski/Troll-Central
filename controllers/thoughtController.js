// const {ObjectId} = require('mongoose').Types;
// const {json} = require('express');
// const {Thought, User} = require('../models');

// const headCount = async() => {
//     const numberOfThoughts = await Thought.aggregate()
//     .count('thoughtCount');
//     return numberOfThoughts;
// }
const { ObjectId } = require('mongoose').Types;
const { json } = require('express');
const { Thought, User } = require('../models');

// Aggregate function to get the number of thoughts overall
const headCount = async () => {
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

// module.exports = {
//     async getThoughts(req, res) {
//         try {
//             const thoughts = await Thought.find();
//             res.json(thoughts);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     async getSingleThough(req, res) {
//         try {
//             const thought = await Thought.findOne({_id: req.params.thoughtId})
//             .select('-_v');

//         if(!thought) {
//             res.status(404).json({message: 'This thought does not exist'})
//         }

//         res.json({thought});
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     },

//     async createThought(req, res) {
//         try {
//             const thought = await Thought.create(req.body);
//             res.json(thought);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     async deleteThought(req, res) {
//         try {
//             const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

//             if(!thought) {
//                 res.status(404).json({message: 'This thought does not exist'});
//             }

//             const dbThought = await User.findOneAndUpdate(
//                 {thoughts: req.params.thoughtId},
//                 {$pull: { thoughts: req.params.thoughtId}},
//                 {new: true}
//             );

//             if(!dbThought) {
//                 res.status(404).json({message: 'Thought Not Found'});
//             }
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     async updateThought(req, res) {
//         try {
//             const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {
//                 $set: req.body
//             });

//             if(!thought) {
//                 res.status(404).json({message: 'Thought doe not exist'});
//             }
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },
//     async addReaction(req, res) {
//         try {
//             const thought = await Thought.findOneAndUpdate(
//                 {_id: req.params.thoughtId},
//                 {$addToSet: {reactions: req.body}},
//                 {runValidators: true, next: true}
//             );
//             if(!thought) {
//                 res.status(404).json({message: 'Thought does not exist'});
//             }     res.json(thought);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     async removeReaction(req, res) {
//         try {
//             const thought = await Thought.findOneAndUpdate(
//                 {_id: req.body.thoughtId },
//                 {$pull: {reaction: {_id: req.params.reactionId}}},
//                 {runValidators: true, new: true}
//             );
//             if(!thought) {
//                 res.status(404).json({message: 'Thought does not exist.'});
//             } res.json(thought);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

// };

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
  
        res.json({
          thought
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    
    // create a new thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    // Delete a thought and remove them from the course
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No such thought exists' });
        }
  
        const dbTought = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
  
        if (!dbTought) {
          return res.status(404).json({
            message: 'Thought deleted, but no thoughts found',
          });
        }
  
        res.json({ message: 'Thought successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // update thought
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
          $set: req.body
        });
  
        if (!thought) {
          return res.status(404).json({ message: 'No such thought exists' });
        }
  
        res.json({ message: 'Thought successfully updated' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // Add an reaction to a thought
    async addReaction(req, res) {
      console.log('You are adding an reaction');
      console.log(req.body);
  
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove reaction from a thought
    async removeReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { _id: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
