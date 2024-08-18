const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://anjalickpatidar:yaMJUWPr6JcRIqgi@anjportfolio.kcgmw.mongodb.net/Projects', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection success!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
