// hash the passwords to protect user information if the database is hacked 
import bcrypt from 'bcryptjs';
// store the user in the browser for a specific time
import jwt from 'jsonwebtoken';
// import user model to create many instances of users based on the model
import User from '../models/user.js';

export const signin = () => async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        // check if the password the user entered is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // get the json web token if the user exists in the database + the password is correct, and send to the front-end
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        // undefined server error
        res.status(500).json({ message: "Something went wrong." });
    } 
};

export const signup = () => async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // // check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        // 12: difficulty level to hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create the new user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        // create the token
        const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};