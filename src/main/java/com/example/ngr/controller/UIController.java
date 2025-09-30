package com.example.ngr.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.ngr.KafkaProducer;
import com.example.ngr.Scenario;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class UIController {
	
	private final KafkaProducer kafkaProducer;

	public UIController(KafkaProducer producer) {
		this.kafkaProducer = producer;
	}

	@PostMapping("/create-scenario")
	public String getMethodName(@RequestBody Scenario scenario) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		String test = mapper.writeValueAsString(scenario);
		kafkaProducer.sendMessage(test);
		return scenario.getName()+" created";
	}

	@MessageMapping("/getScenarios")
	@SendTo("/topic/scenarios")
	public Scenario getScenarios(@Payload Scenario message) {
		return message;
	}
	
}
