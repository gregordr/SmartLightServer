import Lifx = require('node-lifx-lan')
import express = require('express');
const router: express.Router = express.Router();

const schema = require('../schemas/controlSchema');

router.post('/', (req, res) => {

    const result = schema.validate(req.body);
    if (result.error) {
        res.send(result.error.details[0].message);
        return;
    }

    Lifx.setColorBroadcast({
        color: {
            red: parseFloat(req.body.r),
            green: parseFloat(req.body.g),
            blue: parseFloat(req.body.b),
            kelvin: req.body.kelvin == null ? 3500 : parseInt(req.body.kelvin)
        },
        duration: req.body.duration == null ? 0 : parseInt(req.body.duration)
    }).then(() => {
        Lifx.discover().then((device_list: any) => {
            let res = Promise.all(device_list.map((device: any) => device.getLightState()));
            return res;
        }).then((lightState: any) => {
            res.send(lightState);
        }).catch((error: any) => {
            console.log(error);
            res.send(error);
        })
    }).catch((error: Error) => {
        console.log(error);
        res.send(error);
    });
});

router.get('/', (req, res) => {
    Lifx.discover().then((device_list: any) => {
        let res = Promise.all(device_list.map((device: any) => device.getLightState()));
        return res;
    }).then((lightState: any) => {
        res.send(lightState);
    }).catch((error: any) => {
        console.log(error);
        res.send(error);
    });
})

module.exports = router;