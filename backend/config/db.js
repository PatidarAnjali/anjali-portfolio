require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB connection success!");
    } catch(error) {
        console.error("MongoDB connection fail :(", error);
        process.exit(1); // 0 exit code = success
    }
}

module.exports = connectDB;