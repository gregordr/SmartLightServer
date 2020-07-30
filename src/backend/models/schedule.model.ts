import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import { Request } from 'express';

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

function scheduleCreator(req: Request): mongoose.Document {

  console.log(req.body);
  const date = Date.parse(req.body.date);
  const enabled = req.body.enabled === 'true';
  const repeat = req.body.repeat;
  const r = parseFloat(req.body.r);
  const g = parseFloat(req.body.g);
  const b = parseFloat(req.body.b);
  const kelvin = req.body.kelvin == null ? 3500 : parseInt(req.body.kelvin);
  const duration = req.body.duration == null ? 0 : parseInt(req.body.duration);

  const newSchedule = new Schedule({
    date,
    enabled,
    repeat,
    r,
    g,
    b,
    kelvin,
    duration
  });

  return newSchedule;
}

function scheduleUpdater(req: Request, schedule: mongoose.Document) {
  const date = Date.parse(req.body.date);
  const enabled = req.body.enabled === 'true';
  const repeat = req.body.repeat;
  const r = parseFloat(req.body.r);
  const g = parseFloat(req.body.g);
  const b = parseFloat(req.body.b);
  const kelvin = req.body.kelvin == null ? 3500 : parseInt(req.body.kelvin);
  const duration = req.body.duration == null ? 0 : parseInt(req.body.duration);

  return schedule.replaceOne({
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

module.exports = {
  Schedule,
  scheduleCreator,
  scheduleUpdater
};