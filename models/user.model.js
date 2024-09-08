// mongoose is used to connect express server to database
import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 3 level auth/checks is possible: db level, userlevel, controller level
// user model
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [5, 'Name must be atleast 5 characters in length'],
        maxLength: [50, 'Name should be less than 50 characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-aA-Z]{2,}))$/ , 'Please fill in a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, 'Password must be atleast of 8 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    }, 
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, {
    timestamps: true
});

// secure password during registration: encrypt the password before sending it to database
// using pre() middleware
// on trigger of save do
userSchema.pre('save', async function(){
    // if no modification of password, just move on next
    if(!this.isModified('password')){
        return next(); // move on keep going
    }
    // incase there was a change of password use 'bcrypt' to hash the password
    this.password = await bcrypt.has(this.password, 10);
});

// function definition
userSchema.methods = {
    comparePassword: async function(){
        return await bcrypt.compare(plainTextPassword, this.password);
    },

    generateJWTToken: function(){
        return jwt.sign(
            {
            id: this._id,
            role: this.role,
            email: this.email,
            subscription: this.subscription
            }, 
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
    );
    }
}

const User = model('User', userSchema);


export default User;