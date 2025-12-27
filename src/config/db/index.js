const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to database successfully')
        console.log('Connected DB:', mongoose.connection.name)
    } catch (error) {
        console.log('Failed to connect to database:', error)
    }
}
module.exports = { connect }