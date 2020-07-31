import { Request } from 'express';
import { getStatus, execute as controller_execute } from './controller';
import mongoose = require('mongoose');

class ColorObject {
    red: number = 0;
    green: number = 0;
    blue: number = 0;
    kelvin: number = 0;
};

export class ControlObject {
    color: ColorObject;
    duration: number;
    constructor(color: ColorObject, duration: number) {
        this.color = color;
        this.duration = duration;
    }

    static fromRequest(req: Request): ControlObject {
        const color = {
            red: parseFloat(req.body.r),
            green: parseFloat(req.body.g),
            blue: parseFloat(req.body.b),
            kelvin: parseInt(req.body.kelvin) || 3500
        };
        const duration = parseInt(req.body.duration) || 0;

        return new ControlObject(color, duration);
    }

    static fromDocument(doc: mongoose.Document): ControlObject {
        const { r, g, b, kelvin, duration } = doc.toObject();
        const color = {
            red: r,
            green: g,
            blue: b,
            kelvin: kelvin
        }
        return new ControlObject(color, duration);
    }

    async execute(): Promise<string | Error> {
        const res = await controller_execute(this);
        if (typeof res === 'object')
            return res;
        return await getStatus();
    }
}