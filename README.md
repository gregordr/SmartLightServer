# SmartLightServer

## Function:
This can run on any device that supports docker, including a Raspberry Pi. It serves as an alternative to the current LIFX app, which requires a connection to the LIFX servers. You can control your lightbulb via HTTP requests, and also schedule future events, wheter only once or repeated on several days of the week.

The data will be stored on a MongoDB database, ideally one that runs within your local network so that the server will continue to execute it's schedules even if you are not connected to the internet.

## Setup:
Prerequisites:
NodeJS or Docker, MongoDB database

1. Clone this repository
2. Create a file called .env and enter `MONGO_URI=<INSERT YOUR MONGO URI>`. Be careful not to commit this!
3. If using Docker, run `docker build .`, and then run the created dockerfile with the arguments `-p 3999:3999 -p 56700:56700/udp`.
4. If not using Docker, run `npm install` and `npx ts-node --files ./backend/server.ts`.
