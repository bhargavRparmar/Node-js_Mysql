const bcrypt = require('bcrypt');
const saltRounds = 10;
const logger = require('../logger/logger');
const db = require('../dbConnection/db');
const Otp = require('../Middleware/Otp');
const { registrationValidate, loginValidate, EmailValidate, updatePasswordValidate, resetpasswordValidate, updateProfileValidate } = require('../validation/authValidation');





const otp = Math.floor(100000 + Math.random() * 900000);
logger.info(otp);


exports.registration = async(req, res) => {

    try {
        console.log(req.body);
        let { error } = registrationValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);

        } else {
            const encryptedPassword = await bcrypt.hash(req.body.Password, saltRounds);
            const fname = req.body.fname;
            const mname = req.body.mname;
            const lname = req.body.lname;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const mobile = req.body.mobile;
            const Image = req.file.filename;
            const city = req.body.city;
            const Email = req.body.Email;
            const Password = encryptedPassword;

            const sql = `INSERT INTO registration(fname,mname,lname,gender,hobby,mobile,Image,city,Email,Password)VALUES('${fname}','${mname}','${lname}','${gender}','${hobby}','${mobile}','${Image}','${city}','${Email}','${Password}')`;

            db.query(sql, (err, result) => {
                if (err) {
                    logger.error('Error', err);
                } else {
                    res.send("record Inserted....");
                }

            });
        }


    } catch (err) {
        logger.error("err", err);
    }
};

exports.login = async(req, res) => {

    try {

        let { error } = loginValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);

        } else {

            const Email = req.body.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {

                if (err) {

                    logger.error("error", err);
                } else {
                    if (response.length > 0) {

                        const comparison = await bcrypt.compare(req.body.Password, response[0].Password);
                        if (comparison)
                            res.send("login Success...");
                        else
                            res.send("Password is not correct..");

                    } else {
                        res.send("login Not Valid...");
                    }
                }
            });
        }
    } catch (err) {
        logger.error("err", err);
    }

};


exports.verifyEmail = async(req, res) => {
    try {
        let { error } = EmailValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const Email = req.body.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (err) {
                    logger.error("error", err);
                } else {
                    if (response.length > 0) {
                        Otp(req.body.Email, otp);
                        res.send("OTP Sended...")
                    } else {
                        res.send("Email invalid...")
                    }
                }
            });

        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.verifyOtp = async(req, res) => {
    try {

        if (otp == req.body.otp) {
            res.send("OTP is valid");

        } else {
            res.send("OTP is invalid");
        }

    } catch (err) {
        logger.error("err", err);

    }
};

exports.updatePassword = async(req, res) => {
    try {
        let { error } = updatePasswordValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const Email = req.body.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (response) {

                    const encryptedPassword = await bcrypt.hash(req.body.Password, saltRounds);
                    if (encryptedPassword) {
                        db.query(`UPDATE registration set Password=? WHERE Email=?`, [encryptedPassword, Email]);
                        res.send("Password Updated....")
                    } else {
                        res.send("Invalid Password");
                    }
                }
            });

        }

    } catch (err) {
        logger.error("err", err);
    }
};



exports.viewProfile = async(req, res) => {
    try {


        db.query(`SELECT * FROM registration`, async(err, response) => {
            if (err) {
                logger.error("error", err);
            } else {

                res.send(response);

            }
        });

    } catch (err) {
        logger.error("err", err);
    }
};


exports.forgetPassword = async(req, res) => {
    try {
        let { error } = resetpasswordValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {

            const Email = req.user.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (err) {
                    logger.error("error", err);
                }
                if (response) {

                    const comparison = await bcrypt.compare(req.body.CurrentPassword, response[0].Password);
                    if (comparison) {
                        const updatePassword = await bcrypt.hash(req.body.Password, saltRounds);
                        db.query(`UPDATE registration set Password='${updatePassword}'WHERE Email=?`, [Email], async(err1, response1) => {
                            if (response1) {
                                res.send("Your Password has been Reset");
                            } else {
                                res.send("Your Password has not been Reset");
                            }
                        });


                    } else {
                        res.send("Current Password is incorrect");
                    }

                }
            });

        }


    } catch (err) {
        logger.error("err", err);
    }
};

exports.updateProfile = async(req, res) => {
    try {
        const { error } = updateProfileValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const Email = req.user.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (err) {
                    logger.error("error", err);
                }
                if (response) {
                    const fname = req.body.fname;
                    const mname = req.body.mname;
                    const lname = req.body.lname;
                    const gender = req.body.gender;
                    const hobby = req.body.hobby;
                    const mobile = req.body.mobile;
                    const Image = req.file.filename;
                    const city = req.body.city;
                    const Email = req.body.Email;

                    db.query(`UPDATE registration set fname='${fname}',mname='${mname}',lname='${lname}',gender='${gender}',hobby='${hobby}',mobile='${mobile}',Image='${Image}',city='${city}',Email='${Email}'WHERE Email=?`, [Email], async(err1, response1) => {

                        if (response1) {
                            res.send("Profile Updated....");
                        } else {
                            res.send("Profile not Updated....");
                        }
                    });

                }
            });

        }

    } catch (err) {
        logger.error("err", err);
    }
};



exports.logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("id");
        res.send('logout Done.....')
    } catch (err) {
        logger.error("err", err)
    }
};