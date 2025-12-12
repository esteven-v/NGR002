# NGR002: Scenario Management Tool

## About

Capstone NGR002 is a scenario management tool built with Java Springboot, Apache Kafka, and CesiumJS for 3D maps. Northrup Grumman develops event-based applications for USSTRATCOM. Administrators and trainees all need to be able to simultaneously participate in an event or drill. This is a proof of concept for this idea. Administrators should be able to create, play, pause, and edit scenarios, while regular users are able to view updates in real time.

## Documentation

- [Frontend](https://esteven-v.github.io/NGR002/docs/frontend-docs/index.html)
- [Backend](https://esteven-v.github.io/NGR002/docs/backend-docs/index.html)

## Endpoints

- `create-scenario` - initialize scenario
- All of these endpoints use the Event class. Not every event type uses every field
    - `create-area`: polygonCoords (array), polygonShape (string)
    - `add-unit`: destination_coords (string)
    - `move-unit`: destination_coords (string)

## Release Notes

### Code Milestone 4
- The frontend logic that updates the Cesium map has been updated to send post requests from the dashboard to the backend. The backend then sends these requests over Kafka, from which they then get emitted and broadcasted on the websocket.
- The frontend dashboard requests are sent from the `index.js` file, and the websocket logic that updates the map is still in `websocket.js`.
- Some of the class members of the event object (`Event.java`) had their types changed to work better with Cesium and the frontend 
- The Cesium map uses the OpenStreetmap base layer and no 3D buildings.

- map-with-backend: split event/object creation logic on frontend in two: Input into the Create Event dashboard and the websockets that update the map
- kafka-websocket-test branch: backend, minimal changes
- Esteven-Branch: Used to migrate CesiumJS code, add additional functionality for demo

### Code Milestone 3
- The CesiumJS project has been migrated into the main repository. Currently it just displays the map and has a bottom section showing events/actions.
- Websocket logic is stored in `websocket.js`, and called when the page is loaded after the cesium map.
- The rest of the source files are the same as the CesiumJS demo code

- kafka-websocket-test branch: backend, minimal changes
- Esteven-Branch: Used to migrate CesiumJS code, add additional functionality for demo

### Code Milestone 2
- New class: `Event`: This holds multiple different event types and all properties an event could need
- In `UIController.java`, there are new endpoints for each type of event
    - when an event object is pushed to it's respective endpoint, the type is updated and pushed to Kafka
- The `test.html` file still listens and recieves from the websocket endpoint

- kafka-websocket-test branch: for backend
- Esteven-Branch: frontend/other components, currently not used yet

### Code Milestone 1
- Springboot backend is working and can connect to Kafka
- POST requests from `/create-scenario` endpoint are sent to Kafka
- when Kafka events are emitted, the Springboot server's websocket broadcasts the message
- the `test.html` file successfully receives websocket messages

- kafka-websocket-test branch: for backend
- Esteven-Branch: frontend/other components, currently not used yet

## New dev instructions (build spring boot app in containers)
2    
- start kafka server docker container: `docker run --network=host -p 9092:9092 apache/kafka-native:4.1.0`
    - do `docker pull apache/kafka-native:4.1.0` if not already installed
- run `docker build -t ngr002 .` after any changes
- run `docker run --network=host -p 8080:8080 ngr002`
- open test.html file in browser, verify that the websocket has connected
- open Postman and send a post request to `localhost:8080/create-scenario`
- messages will appear in test.html
- frontend: go into `cesium` folder, run `npm install` if first downloading, then run `npm start`

## Old instructions (run spring boot app w/o docker container)

- start kafka server docker container: `docker run -p 9092:9092 apache/kafka-native:4.1.0`
- start springboot app: press `F5` in `NgrApplication.java`
- open test.html file in browser, verify that the websocket has connected
- open Postman and send a post request to `localhost:8080/create-scenario`
- messages will appear in test.html

## Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.6/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.5.6/maven-plugin/build-image.html)
* [Kafka quickstart](https://kafka.apache.org/quickstart) - use docker image from here (JVM or GraalVM one should work)
    * Note: when first started, it may take a while between when the first `/create-scenario` request is made to when it appears on the websocket. this is probably because with the docker image it doesn't let you create a topic name. the springboot app/container seem to handle this fine though, and all subsequent requests show up instantly on the websocket
    * start kafka docker container: `docker run -p 9092:9092 apache/kafka-native:4.1.0`
* `test.html`: shows websocket messages, postman can't subscribe to websockets
* TODO: implement rest of scenario object
- Useful example for backend (also has example react app): https://github.com/subhnet/chat-app 
- setup vscode for spring boot: https://code.visualstudio.com/docs/java/java-spring-boot
- cesium points/labels
    - https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/
    - https://sandcastle.cesium.com/?id=labels
- test coordinates
    - area: 41.217010, -96.014367; 41.236630, -96.022732; 41.236843, -96.012241; 41.227993, -96.003025
    - points:
        - 41.23790714412647,-96.02027670289351
        - 41.253870818102065,-95.97497779228111