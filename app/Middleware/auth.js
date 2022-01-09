const jwt = require("jsonwebtoken");
const logger = require('../logger/logger');



const generateToken = (req, res, next) => {
    let token = jwt.sign({ Email: req.body.Email }, process.env.PRIVATE_KEY);

    res.cookie("jwt", token)
    next();

};


const authenticate = (req, res, next) => {
    try {

        const token = req.cookies.jwt;


        if (token == undefined) {
            res.send('Enter Token..');
        }

        const verifyUser = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = verifyUser;

        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    authenticate,
    generateToken
};