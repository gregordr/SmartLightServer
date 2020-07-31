import mongoose = require('mongoose');
const Schedule: mongoose.Model<mongoose.Document, {}> = require('./models/schedule.model').Schedule;
import { ControlObject } from './control/controlObject';
import { format, addMinutes } from 'date-fns'

export function scheduler() {
    finderOnce();
    cleaner();
}

async function finderOnce() { //If multiple activations are supposed to happen this minute, only one will happen
    let found = await Schedule.findOne({
        enabled: true,
        repeat: "once",
        date: {
            $gte: new Date(),
            $lt: (addMinutes(new Date(), 1))
        }
    });

    if (found !== null) {
        carryOut(found); //Once, current hour and minute, takes preference over regular schedule
        return;
    }

    found = await Schedule.findOne({
        enabled: true,
        repeat: "once", //contains current day
        date: { //only consider H/M
            $gte: new Date(),
            $lt: (addMinutes(new Date(), 1))
        }
    });

    if (found !== null) {
        carryOut(found);
        return;
    }
}

function carryOut(schedule: mongoose.Document) { //Execute this schedule
    const control = ControlObject.fromDocument(schedule);
    control.execute();
}

async function cleaner() {
    await Schedule.deleteMany({
        repeat: "once",
        date: { $lte: new Date() }
    });
}