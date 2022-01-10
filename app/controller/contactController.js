const express = require('express');
const logger = require('../logger/logger');
const db = require('../dbConnection/db');
const { contactValidate } = require('../validation/contactValidation');

exports.addContact = async(req, res) => {
    try {
        let { error } = contactValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const contactName = req.body.contactName;
            const Email = req.body.Email;
            const contactNumber = req.body.contactNumber;
            const Message = req.body.Message;
            const Date = req.body.Date;

            const sql = `INSERT INTO contactUs (contactName, Email, contactNumber, Message, Date) VALUES('${contactName}', '${Email}', '${contactNumber}', '${Message}', '${Date}')`;
            db.query(sql, (err, result) => {
                if (result) {
                    res.send("Contact Data inserted...");
                } else {
                    res.send("Contact Data not inserted....");
                }
            })
        }
    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
};

exports.viewContact = async(req, res) => {
    try {


        db.query(`SELECT * FROM contactUs`, async(err1, response1) => {
            if (response1) {
                res.send(response1);
            } else {
                res.send('Contact Not found!');
            }
        });


    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}

exports.updateContact = async(req, res) => {
    try {
        let { error } = contactValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const id = req.params.id;


            const contactName = req.body.contactName;
            const Email = req.body.Email;
            const contactNumber = req.body.contactNumber;
            const Message = req.body.Message;
            const Date = req.body.Date;


            db.query(`UPDATE contactUs set contactName = '${contactName}', Email = '${Email}', contactNumber = '${contactNumber}', Message = '${Message}', Date = '${Date}' WHERE id = ?`, [id], (err1, response1) => {
                if (response1) {
                    res.send("Contact Updated...");
                } else {
                    res.send('Contact Not Updated.....');
                }
            })


        }
    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}

exports.deleteContact = async(req, res) => {
    try {
        const id = req.params.id;
        db.query('DELETE FROM contactUs WHERE id=?', [id], async(err, response) => {
            if (response) {
                res.send('Delete Done...');
            } else {
                res.send('Not Deleted....');
            }
        });
    } catch (err) {
        logger.error("err", err);
    }
};


exports.deleteAllContact = async(req, res) => {
    try {



        db.query(`DELETE FROM contactUs`, (err, response1) => {
            if (response1) {
                res.send("All contact Deleted...");
            } else {
                res.send('All contact Not Deleted....');
            }
        })


    } catch (err) {
        logger.error("err", err);

    }
}


exports.multiDeleteContact = async(req, res) => {
    try {
      

            const ids = req.body.ids;


            db.query("DELETE FROM contactUs WHERE id IN ('" + ids.join("','") + "') ", (err, response) => {
                if (response) {
                    res.send("Selected Contact Deleted...");
                } else {
                    res.send('Selected Contact Not Deleted.....');
                }
            })


        
    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }
}
