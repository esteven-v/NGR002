# Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.6/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.5.6/maven-plugin/build-image.html)
* [Kafka quickstart](https://kafka.apache.org/quickstart) - use docker image from here (JVM or GraalVM one should work)
    * Note: when first started, it may take a while between when the first `/create-scenario` request is made to when it appears on the websocket. this is probably because with the docker image it doesn't let you create a topic name. the springboot app/container seem to handle this fine though, and all subsequent requests show up instantly on the websocket
* `test.html`: shows websocket messages, postman can't subscribe to websockets
* TODO: implement rest of scenario object
- Useful example for backend (also has example react app): https://github.com/subhnet/chat-app 
- setup vscode for spring boot: https://code.visualstudio.com/docs/java/java-spring-boot
