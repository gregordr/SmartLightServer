import Joi = require('@hapi/joi')
import { controlSchema } from './controlSchema'
export const scheduleSchema = controlSchema.append({
    date: Joi.date().required(),
    enabled: Joi.boolean().required(),
    repeat: Joi.string().regex(new RegExp("^once$|" + new RegExp("^((mon|tues|wednes|thurs|fri|satur|sun)day ?)*$"))).required()
});