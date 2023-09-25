const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        dbURL = "mongodb+srv://cdp:cdp@cluster0.y4taiwi.mongodb.net/";

        mongoose.set("strictQuery", false);

        await mongoose.connect(dbURL).then(() => {
            console.log("DB is successfully connected!");
        });
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

module.exports = connectDB;