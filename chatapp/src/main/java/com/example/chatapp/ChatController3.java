package com.example.chatapp;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ChatController3 {
    
    private final SimpMessagingTemplate simpMessagingTemplate;
    

    public ChatController3(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

@MessageMapping("/sendMessage3")
    public void sendMessage(@RequestBody ChatMessage chatMessage){
        simpMessagingTemplate.convertAndSendToUser(chatMessage.getReciever(),"/queue/messages",chatMessage);

    }
}
