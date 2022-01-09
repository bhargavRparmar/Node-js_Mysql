const Joi = require('joi');


function contactValidate(req) {
    const schema = Joi.object({
        contactName: Joi.string().required().empty().messages({
            "string.base": `Contact Name should be a type of 'text'`,
            "string.empty": `Contact Name cannot be an empty field`,
            "any.required": `Contact Name is a required field`,
        }),
        Email: Joi.string().required().empty().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
            "number.empty": `Contact number cannot be an empty field`,
            "number.min": "Contact number must be 10 digit",
            "number.max": "Contact number can't be greater than 10 digit",
            "any.required": `Contact number is a required field`,
        }),
        Message: Joi.string().required().empty().messages({
            "string.base": `Message should be a type of 'text'`,
            "string.empty": `Message cannot be an empty field`,
            "any.required": `Message is a required field`,
        }),
        Date: Joi.date().required().messages({
            "any.required": `date is a required field`,
        })

    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
}

module.exports = {
    contactValidate
}