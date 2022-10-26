const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.collection.insertMany([
        {
            username: "Rodrigo",
            email: "roddy@email.com"
        },
        {
            username: "Svetlana",
            email: "Svet@email.com"
        },
        {
            username: "Carolina",
            email: "southern@email.com"
        },
        {
            username: "Junior",
            email: "dosSantos@email.com"
        },
        {
            username: "Yoel",
            email: "Romero@email.com"
        }

    ]);

    console.info('SEEDING SUCCESSFUL.');
    process.exit(0);
});