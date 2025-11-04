# NGR002: Scenario Management Tool

## About

Capstone NGR002 is a scenario management tool built with Java Springboot, Apache Kafka, and CesiumJS for 3D maps. Northrup Grumman develops event-based applications for USSTRATCOM. Administrators and trainees all need to be able to simultaneously participate in an event or drill. This is a proof of concept for this idea. Administrators should be able to create, play, pause, and edit scenarios, while regular users are able to view updates in real time.

## Release Notes

### Code Milestone 1
- Springboot backend is working and can connect to Kafka
- POST requests from `/create-scenario` endpoint are sent to Kafka
- when Kafka events are emitted, the Springboot server's websocket broadcasts the message
- the `test.html` file successfully receives websocket messages

- kafka-websocket-test branch: for backend
- Esteven-Branch: frontend/other components, currently not used yet

## New dev instructions (build spring boot app in containers)

- start kafka server docker container: `docker run --network=host -p 9092:9092 apache/kafka-native:4.1.0`
    - do `docker pull apache/kafka-native:4.1.0` if not already installed
- run `docker build -t ngr002 .` after any changes
- run `docker run --network=host -p 8080:8080 ngr002`
- open test.html file in browser, verify that the websocket has connected
- open Postman and send a post request to `localhost:8080/create-scenario`
- messages will appear in test.html

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
