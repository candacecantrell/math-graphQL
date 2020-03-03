const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user-model')


module.exports = {
        createUser: async function ({userInput}, req){
            const errors = []
            if(!validator.isEmail(userInput.email)){
                errors.push({message: 'Email is invalid'})
            }
            if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 8})){
                errors.push({message: 'Password is not long enough'})
            }
            if (errors.length > 0) {
                const error = new Error('Invalid input')
                error.data = errors
                error.code = 422
                throw error
            }
            const existingUser = await User.findOne({email: userInput.email})
            if (existingUser){
                const error = new Error('User already exists')
                throw error
            }
           const hashedPw = await bcrypt.hash(userInput.password, 12)
           const user = new User({
               email: userInput.email,
               password: hashedPw
           })
           const createdUser = await user.save()
           return{ ...createdUser._doc, _id: createdUser._id.toString() }
        }
    }
