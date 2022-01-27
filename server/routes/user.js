import express from 'express';

import { signin, signup } from '../controllers/user.js';

const router = express.Router();

// post route: because we want to send the details of the login form to the back end 
// call the signin/signup controller
router.post('/signin', signin);
router.post('/signup', signup);

export default router;