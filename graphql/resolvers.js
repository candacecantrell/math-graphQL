const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user-model')
const Student = require('../models/students-model')



const graphqlResolvers = {
    Mutation: {
    createUser: async function (){
        const errors = []
            if(!validator.isEmail(email)){
                errors.push({message: 'Email is invalid'})
            }
            if (validator.isEmpty(password) || !validator.isLength(userInput.password, { min: 8})){
                errors.push({message: 'Password is not long enough'})
            }
            if (errors.length > 0) {
                const error = new Error('Invalid input')
                error.data = errors
                error.code = 422
                throw error
            }
            const existingUser = await User.findOne(email)
            if (existingUser){
                const error = new Error('User already exists')
                throw error
            }
           const hashedPw = await bcrypt.hash(password, 12)
           const user = new User({
               email: email,
               password: hashedPw
           })
           const createdUser = await user.save()
           return{ ...createdUser._doc, _id: createdUser._id.toString() }       
        },
    },
    
    Query: {
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
    },
    Mutation: {
    createStudent: async function({ name }, req) {
        if (!req.isAuth){
            const error = new Error('Not Authenticated')
            error.code = 401
            throw error
        }
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
        const user = await User.findById(req.userId)
        if (!user){
            const error = new Error('invalid user')
            error.data = errors
            error.code = 401
            throw error
        }
        const student = new Student({
            name: name,
            creator: user
            })
        const createdStudent = await student.save()
        user.students.push(createdStudent)
        await user.save()
       
        return {
            ...createdStudent._doc, 
            _id: createdStudent._id.toString(),
            }
        },
    },
    Query: {
        allUsers: async () => await User.find({}).exec()
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
        
    }

    module.exports = {
        graphqlResolvers
    }
