import AppError from "../utils/appError.js";
import User from '../models/user.model.js';

const cookieOptions = {
    secure: true,
    maxAge: 7*24*60*60*1000, // set it for 7 days
    httpOnly: true
}

const register = async (req, res) => {
    const {fullName, email, password} = req.body;
    // some validations
    // if a user doesn't enter full info, then throw this error
    if(!fullName || !email || !password){
        // go to next job
        return next(new AppError('All fields are required', 400))
    }

    const userExists = await UserActivation.findOne({email});

    // if user exists and some new user while registering gives same email
    if(userExists){
        return next(new AppError('Email already exists', 400));
    }

    const user = await User.create({
        fullName,
        email, 
        password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drygxv.jpg'  // contains a dummy url 
        }
    });

    // user doesnt exist
    if(!User){
        return next(new AppError('User registration failed, please try again', 400));
    }

    // upload user picture -> thumbnail





    // save the instance of User->user
    await user.save();

    // set JWT token in cookie




    // dont send the password again as response
    user.password = undefined;

    // 200 - success, ok
    // send us a response(here success response): if the user is successfully able to register
    res.status(200).json({
        success: true,
        message: 'User registered successfully',

    })
}

const login = async(req, res) => {
    // this is post
    const {email, password} = req.body;

    // do some validation
    if(!email || !password){
        return next(new AppError('All fields are required', 400));    
    }

    // find the user the given email during login process from the database
    const user = await User.findOne({
        email // ask for an extra info: password
    }).select('+password');

    // if user doesnt exist or password doesnt match
    if(!user || !user.comparePassword(password)){  
        return next(new AppError('Email or password does not match', 400)); 
        // use 'bcrypt' library to compare password as it will be encrypted in DB
    }

    // so generate token generate JWT token
    const token = await user.generateJWTToken();
    
    // to not return password back while login
    user.password = undefined;

    // set cookie options
    res.cookie('token', token, cookieOptions); 

    // 201: success, created
    res.json(201, {
       success: true,
       message: 'User registered successfully',
       user
    });
}

const logout = (req, res) => {
    // reset the cookie
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    // give back the status
    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}

const getProfile = (req, res) => {
    // get user deatils using this middleware
    const user = User.findById(req.user.id);

    res.status(200).json({
        success: true,
        message: 'User details',
        user
    })
}

export {
    register,
    login,
    logout,
    getProfile
}
