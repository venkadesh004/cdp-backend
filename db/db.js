const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        dbURL = process.env.HOST;

        mongoose.set("strictQuery", false);

        await mongoose.connect(dbURL).then(() => {
            console.log("DB is successfully connected!");
        });
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

module.exports = connectDB;