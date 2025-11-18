package com.example.ngr;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkatemplate;

    
    public KafkaProducer(KafkaTemplate<String, String> template) {
        this.kafkatemplate = template;
    }

    public void sendMessage(String msg) {
        kafkatemplate.send("test-events", msg);
    }
}
