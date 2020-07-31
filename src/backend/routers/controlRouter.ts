import express = require('express');
const router = express.Router();
import { getStatus } from '../control/controller';
import { ControlObject } from '../control/controlObject';
import { controlSchema } from '../schemas/controlSchema';


router.get('/', async (req, res) => {
    res.json(await getStatus());
});

router.post('/', async (req, res) => {
    const result = controlSchema.validate(req.body);
    if (result.error) {
        res.json(result.error.details[0].message);
        return;
    }

    const controlObject = ControlObject.fromRequest(req);
    res.json(await controlObject.execute());
});

module.exports = router;