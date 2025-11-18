package com.example.ngr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Service
public class KafkaConsumerService {
    @Autowired
    private final SimpMessagingTemplate messagingTemplate;

    public KafkaConsumerService(SimpMessagingTemplate template) {
        this.messagingTemplate = template;
    }
    @KafkaListener(topics = "test-events", groupId = "foo")
    public void consume(String message) throws JsonMappingException, JsonProcessingException {
         
        System.out.println(message);
        messagingTemplate.convertAndSend("/topic/scenarios", message);
    }
}
