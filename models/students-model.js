const mongoose = require('mongoose')
const { Schema } = mongoose;

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

const Students = mongoose.model('Students', studentSchema)

module.exports = {
    Students
};