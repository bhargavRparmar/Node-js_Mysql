const express = require('express');
const logger = require('../logger/logger');
const db = require('../dbConnection/db');
const { testimonialValidate } = require('../validation/testimonialValidation');




exports.addTestimonial = async(req, res) => {
    try {
        let { error } = testimonialValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const T_Name = req.body.T_Name;
            const designation = req.body.designation;
            const T_Desc = req.body.T_Desc;
            const Image = req.file.filename;

            const sql = `INSERT INTO testimonial (T_Name, designation, T_Desc, Image) VALUES('${T_Name}', '${designation}', '${T_Desc}', '${Image}')`;
            db.query(sql, (err, result) => {
                if (result) {
                    res.send("Testimonial Data inserted...");
                } else {
                    res.send("Testimonial Data not inserted....");
                }
            })
        }
    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
};

exports.viewTestimonial = async(req, res) => {
    try {

        db.query(`SELECT * FROM testimonial`, async(err, response1) => {
            if (response1) {
                res.send(response1);
            } else {
                res.send('Testimonial Not found....');
            }
        });


    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}

exports.updateTestimonial = async(req, res) => {
    try {
        let { error } = testimonialValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const id = req.params.id;


            const T_Name = req.body.T_Name;
            const designation = req.body.designation;
            const T_Desc = req.body.T_Desc;
            const Image = req.file.filename;
            db.query(`UPDATE testimonial set T_Name = '${T_Name}', designation = '${designation}', T_Desc = '${T_Desc}', Image = '${Image}' WHERE id = ?`, [id], (err, response1) => {
                if (response1) {
                    res.send("Testimonial Updated...");
                } else {
                    res.send('Testimonial Not Updated...');
                }
            })


        }
    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}

exports.deleteTestimonial = async(req, res) => {
    try {

        const id = req.params.id;


        db.query(`DELETE FROM testimonial WHERE id = ? `, [id], (err, response1) => {
            if (response1) {
                res.send("Testimonial Deleted...");
            } else {
                res.send('Testimonial Not Deleted....');
            }
        })


    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}

exports.deleteAllTestimonial = async(req, res) => {
    try {


        db.query(`DELETE FROM testimonial`, (err, response) => {
            if (response) {
                res.send("All Testimonial Deleted...");
            } else {
                res.send('All Testimonial Not Deleted....');
            }
        })


    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}



exports.multiDeleteTestimonial = async(req, res) => {
    try {


        const ids = req.body.ids;


        db.query("DELETE FROM portfolio WHERE id IN ('" + ids.join("','") + "') ", (err1, response1) => {
            if (response1) {
                res.send("Selected Portfolio Deleted...");
            } else {
                res.send('Selected Portfolio Not Deleted.....');
            }
        })



    } catch (err) {
        logger.error("err", err);

    }
}