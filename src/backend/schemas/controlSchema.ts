import Joi = require('@hapi/joi')

const schema = Joi.object({
    r: Joi.number().required().min(0).max(1),
    g: Joi.number().required().min(0).max(1),
    b: Joi.number().required().min(0).max(1),
    kelvin: Joi.number().min(1500).max(9000),
    duration: Joi.number().min(0)
});

module.exports = schema;