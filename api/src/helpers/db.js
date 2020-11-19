const mongoose = require('mongoose')

const {dbUrl} = require('../configuration')

module.exports.connectDb = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    return mongoose.connection
};