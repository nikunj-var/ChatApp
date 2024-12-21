package com.example.chatapp;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController2 {
    
    @MessageMapping("sendMessage2")
    @SendTo("/topic2/messages2")
    public String sendMessage(String message){
        return message;
    }
}
