const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user-model')
const Student = require('../models/students-model')



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
        },
    
    login: async function({ email, password }) {
            const user = await User.findOne({ email: email})
            if (!user) {
                const error = new Error('User not found')
                error.code = 401
                throw error
            }
            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual){
                const error = new Error('Password is incorrect')
                error.code = 401
                throw error
            }
            const token = jwt.sign({
                userId: user._id.toString()
            }, 
            'H>e5esJUy1sBXPaw', 
            {expiresIn: '1h'}
            )
            return { token: token, userId: user._id.toString() }
        },
    createStudent: async function({ studentInput }, req) {
      const errors = []

// error code not working check later   
     /*
        if(
            validator.isEmpty(studentInput.name) || 
            !validator.isLength(studentInput.name, { min: 1 }) 
        ){ 
            error.push({ message: "Student must have a name"})
        }
        if (error.length > 0){
            const error = new Error('Invalid input')
            error.data = errors
            error.code = 422
            throw error
        } */
        
        const student = new Student({
            name: studentInput.name
            })
        const createdStudent = await student.save()
       
        return {
            ...createdStudent._doc, 
            _id: createdStudent._id.toString(),
            }
        },
        
    }
