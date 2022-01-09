const express = require('express');
const logger = require('../logger/logger');
const db = require('../dbConnection/db');
const { portfolioValidate } = require('../validation/portfolioValidation');
const { response } = require('express');


exports.addPortfolio = async(req, res) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const category = req.body.projectCategory;


            db.query(`SELECT * FROM addCategory WHERE categoryName = ?`, [category], (err, result) => {
                if (result) {

                    const mulImg = req.files.map((mulImg) => mulImg.filename);
                    const projectCategory = result[0].id;
                    const projectName = req.body.projectName;
                    const projectTitle = req.body.projectTitle;
                    const projectDate = req.body.projectDate;
                    const projectDescription = req.body.projectDescription;
                    const projectImage = mulImg;

                    const sql = `INSERT INTO portfolio ( projectCategory,projectName,projectTitle,projectDate,projectDescription,projectImage) VALUES('${ projectCategory}', '${projectName}', '${projectTitle}', '${projectDate}', '${projectDescription}','${projectImage}')`;
                    db.query(sql, (err1, response1) => {
                        if (response1) {
                            res.send("Data inserted...");
                        } else {
                            res.send("Data not inserted!");
                        }
                    })
                } else {
                    res.send("Category Data not found!");
                }
            })


        }
    } catch (err) {
        logger.error("err", err);

    }
};

exports.viewPortfolio = async(req, res) => {
    try {



        db.query(`SELECT portfolio.id,addCategory.categoryName,portfolio.projectName,portfolio.projectTitle,portfolio.projectImage,portfolio.projectDate,portfolio.projectDescription FROM portfolio INNER JOIN categories ON categories.id = portfolio. projectCategory`, async(err, response1) => {
            if (response1) {
                res.send(response1);
            } else {
                res.send('Portfolio Not found!');
            }
        });


    } catch (err) {
        logger.error("err", err);

    }
}

exports.updatePortfolio = async(req, res) => {
    try {
        let { error } = portfolioValidate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const id = req.params.id;
            const category = req.body.proj_category;


            db.query(`SELECT * FROM addCategory WHERE categoryName = ?`, [category], (err, result) => {
                if (result) {
                    const mulImg = req.files.map((mulImg) => mulImg.filename);
                    const projectCategory = result[0].id;
                    const projectName = req.body.projectName;
                    const projectTitle = req.body.projectTitle;
                    const projectDate = req.body.projectDate;
                    const projectDescription = req.body.projectDescription;
                    const projectImage = mulImg;

                    db.query(`UPDATE portfolio set projectCategory= '${projectCategory}', projectName = '${projectName}',projectTitle = '${projectTitle}',projectDate = '${projectDate}', projectDescription= '${projectDescription}, projectImage = '${ projectImage}'' WHERE id = ?`, [id], (err1, response1) => {
                        if (response) {
                            res.send("Portfolio updated...");
                        } else {
                            res.send("Portfolio not updated...");
                        }
                    })
                } else {
                    res.send("Category Data not found!");
                }
            })


        }
    } catch (err) {
        logger.error("err", err);

    }
};

exports.deletePortfolio = async(req, res) => {
    try {

        const id = req.params.id;


        db.query(`DELETE FROM portfolio WHERE id = ? `, [id], (err, response1) => {
            if (response1) {
                res.send("Portfolio Deleted...");
            } else {
                res.send('Portfolio Not Deleted.......');
            }
        })


    } catch (err) {
        logger.error("err", err);

    }
}

exports.deleteAllPortfolio = async(req, res) => {
    try {



        db.query(`DELETE FROM portfolio`, (err, response1) => {
            if (response1) {
                res.send("All Portfolio Deleted...");
            } else {
                res.send('All Portfolio Not Deleted....');
            }
        })


    } catch (err) {
        logger.error("err", err);

    }
}

exports.multiDeletePortfolio = async(req, res) => {
    try {
        let { error } = multipleDeleteValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const ids = req.body.ids;


            db.query("DELETE FROM portfolio WHERE id IN ('" + ids.join("','") + "') ", (err1, response1) => {
                if (response1) {
                    res.send("Selected Portfolio Deleted...");
                } else {
                    res.send('Selected Portfolio Not Deleted.....');
                }
            })


        }
    } catch (err) {
        logger.error("err", err);

    }
}