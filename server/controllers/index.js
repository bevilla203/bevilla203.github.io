require('dotenv').config();
const { Users } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


const handleSignUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(401).json({ message: 'Please fill out all fields' });
    }
    // check for duplicates in db

    const duplicate = await Users.findOne({
        where: {
            fname: fname,
            lname: lname,
            email: email
        }
    })
    if (duplicate) {
        return res.sendStatus(409)
    }
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, SALT_ROUNDS);
        // create access token and refresh token
        // send access token in res.json
        // store refresh token in db
        const accessToken = jwt.sign(
            {
                email: email,
                password: hashedPwd
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20m' }
        )

        const refreshToken = jwt.sign(
            {
                email: email,
                password: hashedPwd
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // create new user
        await Users.create({
            fname,
            lname,
            email,
            password: hashedPwd,
            refreshToken: refreshToken
        });
        // const createdUser = await Users.findOne({
        //     where: {
        //         fname,
        //         lname,
        //         email,
        //         password: hashedPwd,
        //     }
        // })
        return res.status(201).json({ accessToken })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await Users.findOne({
        where: {
            email
        }
    })
    if (!foundUser) {
        console.log('no found user')
        return res.sendStatus(401) // 401 = unauthorized
    }
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWT
        const accessToken = jwt.sign(
            {
                fname: foundUser.fname,
                lname: foundUser.lname,
                email: foundUser.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20m' }
        )

        const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // set to true if using HTTPS
            maxAge: 24 * 60 * 60 * 1000, // set to desired expiry time
        });

        return req.accessToken = ({ accessToken });
    } else {
        return res.sendStatus(401);
    }

}

// MIDDLEWARE 

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const [, token] = authHeader.split(' ');
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // this callback function handles errors, such as can show up if the token was tampered with
            if (err) {
                res.sendStatus(403) // 403 = invalid toked
            }
            req.email = decoded.email;
            req.fname = decoded.fname;
            req.lname = decoded.lname;
        });
        next();
    } catch (e) {
        console.log('error in catch of verifyJWT function: ', e)
        res.sendStatus(401);
    }
}

module.exports = {
    handleSignUp,
    handleLogin,
    verifyJWT
}