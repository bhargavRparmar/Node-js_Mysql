const express = require('express');
const logger = require('../logger/logger');
const db = require('../dbConnection/db');
const { categoryValidate } = require('../validation/categoryValidation');

exports.addCategory = async(req, res) => {
    try {
        console.log(req.body);
        let { error } = categoryValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const categoryName = req.body.categoryName;

            const sql = `INSERT INTO addCategory(categoryName)VALUES('${categoryName}')`;

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


exports.updateCategory = async(req, res) => {
    try {

        const id = req.params.id;
        const categoryName = req.body.categoryName;

        db.query(`UPDATE addCategory set categoryName='${categoryName}' WHERE id=?`, [id], async(err, response) => {
            if (response) {
                res.send('Category is Updated...');
            } else {
                res.send('Category Not Updated');
            }
        });
    } catch (err) {
        logger.error("err", err);
    }
};



exports.viewCategory = async(req, res) => {
    try {


        db.query(`SELECT * FROM addCategory`, async(err, response) => {
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

exports.deleteCategory = async(req, res) => {
    try {
        const id = req.params.id;
        db.query('DELETE FROM addCategory WHERE id=?', [id], async(err, response) => {
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


exports.deleteAllCategory = async(req, res) => {
    try {

        db.query(`DELETE FROM addCategory `, (err, response1) => {
            if (response1) {
                res.send("All Category Deleted...");
            } else {
                res.send('All Category Not Deleted!');
            }
        })


    } catch (err) {
        logger.error("err", err);

    }
}

exports.multiDeleteCategory = async(req, res) => {
    try {

        const ids = req.body.ids;
        db.query("DELETE FROM categories WHERE id IN ('" + ids.join("','") + "') ", (err, response1) => {
            if (response1) {
                res.send("Selected Category Deleted...");
            } else {
                res.send('Selected Category Not Deleted!.....');
            }
        });



    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }

};