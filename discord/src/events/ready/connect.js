const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URL

module.exports = async (argument, client, handler) => {
    
    if(!mongoURL) return;

    await mongoose.connect(mongoURL || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    if(mongoose.connect) {
        console.log("Successfully connected to MONGO")
    }
    else {
        console.log("Connection to MONGO was not established")
    }
};