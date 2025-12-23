const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/bubble_tea')
        console.log('Connected to database successfully')
    } catch (error) {
        console.log('Failed to connect to database:', error)
    }
}
module.exports = { connect }