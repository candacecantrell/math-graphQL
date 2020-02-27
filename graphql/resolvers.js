const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user-model')
const Students = require('../models/students-model')

module.exports = {
    createUser: async function({ userInput }, req){
        const errors = []
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'Email or password is invalid' })
        }
        if (
            validator.isEmpty(userInput.password) ||
            !validator.isLength(userInput.password, { min: 5})
        ){
            errors.push({ message: 'Password is too short'})
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input')
            error.data = errors
            error.code = 422
            throw error
        }
        const existingUser = await User.findOne({ email: userInput.email })
        if (existingUser) {
            const error = new Error('User already exists')
            throw error
        }
        const hashedPw = await bcrypt.hash(userInput.password, 12)
        const user = new User({
            email: userInput.email,
            password: hashedPw
        })
        const createdUser = await user.save()
        return { ...createdUser._doc, _id: createdUser._id.toString()}
    },
    login: async function({ email, password }) {
        const user = await User.findOne({ email: email })
        if (!user){
            const error = new Error('User not found')
        }
    }
}