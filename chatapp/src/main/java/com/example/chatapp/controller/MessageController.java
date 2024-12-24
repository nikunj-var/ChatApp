package com.example.chatapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.entities.Message;
import com.example.chatapp.entities.MessageRequest;
import com.example.chatapp.services.MessageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/message")
public class MessageController {
    
    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }
    
    @PostMapping("/sendMessage")
    public Message sendMessage(@RequestBody MessageRequest entity) {
        Long senderId = entity.getSenderId();
        Long chatId = entity.getChatId();
        String content = entity.getContent();
        return messageService.sendMessage(chatId,senderId,content);
    }
    
}
