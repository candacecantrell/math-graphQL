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
            required: false
        },
        lesson: {
            type: String,
            require: false
        }
    }
)

module.exports = mongoose.model('Students', studentSchema)