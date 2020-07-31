import Lifx = require('node-lifx-lan');
import { ControlObject } from './controlObject';

export async function getStatus(): Promise<string | Error> {
    return await Lifx.discover().then((device_list: any) => {
        const res = Promise.all(device_list.map((device: any) => device.getLightState()));
        return res;
    }).then((lightState: string) => {
        return lightState;
    }).catch((error: Error) => {
        return error;
    });
}

export async function execute(controlObject: ControlObject): Promise<Error | void> {
    return await Lifx.turnOnBroadcast(
        controlObject
    ).then(() => {
        return;
    }).catch((error: Error) => {
        return error;
    });
}