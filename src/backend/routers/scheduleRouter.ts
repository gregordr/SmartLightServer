import Lifx = require('node-lifx-lan')
import express = require('express');
const router: express.Router = express.Router();
import Joi = require('@hapi/joi');
import mongoose = require('mongoose');

const schema: Joi.ObjectSchema = require('../schemas/scheduleSchema');

const Schedule: mongoose.Model<mongoose.Document, {}> = require('../models/schedule.model').Schedule;
const scheduleCreator: Function = require('../models/schedule.model').scheduleCreator;
const scheduleUpdater: Function = require('../models/schedule.model').scheduleUpdater;

router.get('/', (req, res) => { //Get all entries
    Schedule.find()
    .then((schedule : any) => res.json(schedule))
    .catch((err : Error) => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => { //Add new entry

    const result = schema.validate(req.body);

    if (result.error) {
        res.send(result.error.details[0].message);
        return;
    }

    const newSchedule = scheduleCreator(req);

    newSchedule.save() //Send it back in post!
        .then(() => res.json(newSchedule))
        .catch((err : Error) => res.status(400).json('Error: ' + err));
});

router.put('/:id', (req, res) => { //Change entry

    const result = schema.validate(req.body);
    
    if (result.error) {
        res.send(result.error.details[0].message);
        return;
    }
    
    Schedule.findById(req.params.id).then((updateSchedule) => {
        if (updateSchedule === null)
            throw new Error("Schedule not found");

        scheduleUpdater(req, updateSchedule)
        .then(() => Schedule.findById(req.params.id)
            .then((updatedSchedule) => res.json(updatedSchedule)));
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => { //Remove entry
    if (req.params.id === 'all') {
        Schedule.remove({})
            .then(() => res.json());
        return;
    }

    Schedule.findById(req.params.id).then((deleteSchedule) => {
        if (deleteSchedule === null)
            throw new Error("Schedule not found");
        res.json(deleteSchedule);
        deleteSchedule.remove();
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;