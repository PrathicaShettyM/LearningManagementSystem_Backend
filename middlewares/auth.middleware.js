import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'

const isLoggedIn = function(req, res, next){
    const {token} = req.cookies;
    // if token doesnt exist, throw an error
    if(!token){
        return next(new AppError('Unauthenticated, please login', 401))
    }
    // if token exists decode the token
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);

    // if token existed but it got expired throw error
    if(!tokenDetails){
        return next(new AppError('Unauthenticated, please login', 401))
    }

    // if its a vaild token, then set it to user
    req.user = tokenDetails;

    next(); // now return next
}

export {
    isLoggedIn
}