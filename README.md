# SmartLightServer

## Function:
This can run on any device that supports docker, including a Raspberry Pi. It serves as an alternative to the current LIFX app, which requires a connection to the LIFX servers. You can control your lightbulb via HTTP requests, and also schedule future events, wheter only once or repeated on several days of the week.

The data will be stored on a MongoDB database, ideally one that runs within your local network so that the server will continue to execute it's schedules even if you are not connected to the internet.

## Setup:
Prerequisites:
NodeJS or Docker, MongoDB database

1. Clone this repository
2. Create a file called .env and enter `MONGO_URI=<INSERT YOUR MONGO URI>`. Be careful not to commit this!
3. If using Docker, run `docker build .`, and then run the created dockerfile with the arguments `-p 3999:3999`.
4. If not using Docker, run `npm install` and `npx ts-node --files ./backend/server.ts`.

## Usage:
Send a `GET` request to `/light/control` to get the state of all lights in your local network.

Send a `POST` request to `/light/control` to set all light to a state, determined by the arguments:
*  Required: `r,g,b` required and between `0` and `1`
*  Optinal: `kelvin` between `1500` and `9000` to control the temperature of the light (only if `r=g=b`) and `duration` non-negative, to controll the timeframe over which the change will happen.

The response will contain the new states of all lights.
  
Send a `GET` request to `/light/schedule` to receive all planned schedules.

Send a `DELETE` request to `/light/schedule/ID` to delete the schedule with the corresponding ID. The response will be the schedule.

Send a `DELETE` request to `/light/schedule/all` to delete all schedules.

Send a `POST` request to `/light/schedule` to create a new schedule. The response will be the created schedule.

Send a `PUT` request to `/light/schedule/ID` to overwrite the corresponding schedule. The response will be the new schedule.

Arguments for the `POST` and `PUT` requests are:
* `date`: Date at which this will be executed.
* `enabled`: Set to false to ignore this schedule.
* `repeat`: Set to `once` if it should not be repeated, otherwise to a collection of days, seperated by whitespaces. Example: `monday sunday`.
* The same arguments as described in the `POST` request to `/light/control`.
