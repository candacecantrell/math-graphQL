const mongoose = require('mongoose')
const { Schema } = mongoose

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
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Students'
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
};