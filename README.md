# Getting Started

## Run for development

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
