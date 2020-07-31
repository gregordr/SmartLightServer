import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import { Request } from 'express';
import { ControlObject } from '../control/controlObject';

const scheduleSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true
    },
    repeat: {
        type: String,
        required: true
    },
    r: {
        type: Number,
        required: true
    },
    b: {
        type: Number,
        required: true
    },
    g: {
        type: Number,
        required: true
    },
    kelvin: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
},
    {
        timestamps: false,
    });

const Schedule = mongoose.model('Schedule', scheduleSchema);
function scheduleCreator(req: Request) {
    const date = Date.parse(req.body.date);
    const enabled = req.body.enabled === 'true';
    const repeat = req.body.repeat;
    const controlObject = ControlObject.fromRequest(req);
    const r = controlObject.color.red;
    const g = controlObject.color.green;
    const b = controlObject.color.blue;
    const kelvin = controlObject.color.kelvin;
    const duration = controlObject.duration;

    return new Schedule({
        date,
        enabled,
        repeat,
        r,
        g,
        b,
        kelvin,
        duration
    });
}

async function scheduleUpdater(req: Request, schedule: mongoose.Document) {
    const newSchedule = scheduleCreator(req);
    newSchedule._id = schedule._id;
    await schedule.replaceOne(newSchedule);
    return newSchedule;
}

module.exports = {
    Schedule,
    scheduleCreator,
    scheduleUpdater
};