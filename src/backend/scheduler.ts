import mongoose = require('mongoose');
const Schedule: mongoose.Model<mongoose.Document, {}> = require('./models/schedule.model').Schedule;

let myVar = setInterval(scheduler, 1 * 1000);

function scheduler() {
    finderOnce();
    cleaner();
}

function finderOnce() { //If multiple activations are supposed to happen this minute, only one will happen
    Schedule.findOne({
        enabled: true,
        repeat: "once",
        date: {
            $gte: new Date(),
            $lt: (new Date()).setMinutes((new Date()).getMinutes() + 1)
        }
    })
        .then((found) => { if (found != null) carryOut(found); else finderRepeated(); });  //Once, current hour and minute, takes preference over schedule
}

function finderRepeated() {
    Schedule.findOne({
        enabled: true,
        repeat: "once",
        date: {
            $gte: new Date(),
            $lt: (new Date()).setMinutes((new Date()).getMinutes() + 1)
        }
    })
        .then((found) => { if (found != null) carryOut(found); else finderRepeated(); });
}

function carryOut(schedule: mongoose.Document) { //Execute this schedule

}

function cleaner() {
    Schedule.remove({
        repeat: "once",
        date: { $lte: new Date() }
    });
}