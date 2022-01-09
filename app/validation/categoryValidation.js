const Joi = require('joi');

function categoryValidate(req) {

    const schema = Joi.object({

        categoryName: Joi.string().required().empty().messages({
            "string.base": `Category Name should be a type of 'text'`,
            "string.empty": `Category Name should be an empty field`,
            "any.required": `Category Name is a required field`,
        }),

    })

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,

    };

    return schema.validate(req, options);
}

module.exports = {
    categoryValidate
}