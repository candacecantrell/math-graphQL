const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'New User'
    },
    students: {
        type: Schema.Types.ObjectId,
        ref: 'Students'
    }
})

module.exports = mongoose.model('User', userSchema)