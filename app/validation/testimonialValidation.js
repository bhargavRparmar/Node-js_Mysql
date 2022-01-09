const Joi = require('joi')

function testimonialValidate(req) {
    const schema = Joi.object({

        T_Name: Joi.string().required().empty().messages({
            "string.base": `Testimonial Name should be a type of 'text'`,
            "string.empty": `Testimonial Name cannot be an empty field`,
            "any.required": `Testimonial Name is a required field`,
        }),
        designation: Joi.string().required().empty().messages({
            "string.base": `Designation should be a type of 'text'`,
            "string.empty": `Designation cannot be an empty field`,
            "any.required": `Designation is a required field`,
        }),
        T_Desc: Joi.string().required().empty().messages({
            "string.base": `Testimonial Description should be a type of 'text'`,
            "string.empty": `Testimonial Description cannot be an empty field`,
            "any.required": `Testimonial Description is a required field`,
        }),

    })
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    return schema.validate(req, options);
}


module.exports = {
    testimonialValidate
}