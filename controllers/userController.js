const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get a single user based on Id in params
    getUsersbyID(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new user based on params
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Find user by Id and change based on params
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // finding one from user Id, delete user data and assoc. thought data.
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found.' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted.' }))
            .catch((err) => res.status(500).json(err));
    },

    // add a new friend, user Id and target Id
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // remove an existing friend, user Id and target Id
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
