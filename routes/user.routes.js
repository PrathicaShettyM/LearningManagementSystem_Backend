import express from 'express';
// create router instance
const router = express.Router();
import { isLoggedIn } from '../middlewares/auth.middleware.js';

// import all the controller functions for the routes
import {
    register,
    login,
    logout,
    getProfile
} from './../controllers/user.controller.js';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
// check if the user is logged in, before getting their profile
router.get('/me', isLoggedIn, getProfile);

export default router;

