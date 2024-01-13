const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('database connected successfuly');
})
connection.on('error', () => {
    console.log('database connection failed')
})

module.exports = mongoose;