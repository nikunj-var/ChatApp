package com.example.chatapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.chatapp.entities.Message;
import com.example.chatapp.entities.MessageRequest;
import com.example.chatapp.services.MessageService;

@Controller
public class WebSocketController {
    
    private MessageService messageService;

    public WebSocketController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public Message sendMessage(@RequestBody MessageRequest messageRequest){
        System.out.println("\n\n\n\n"+messageRequest+"\n\n\n");
        Message savedMessage = messageService.sendMessage(messageRequest.getChatId(),messageRequest.getSenderId(),messageRequest.getContent());
        return savedMessage;
    }
}
