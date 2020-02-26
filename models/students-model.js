const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        lesson: {
            type: String,
            require: true
        }
    }
)

module.exports = mongoose.model('Students', studentSchema)