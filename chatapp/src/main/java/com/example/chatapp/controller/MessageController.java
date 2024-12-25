package com.example.chatapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.entities.Message;
import com.example.chatapp.entities.MessageRequest;
import com.example.chatapp.services.MessageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



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
        System.out.println("\n\n\n"+senderId+" "+chatId+" "+content);
        return messageService.sendMessage(chatId,senderId,content);
    }

    @GetMapping("/chat-history/{id}")
    public List<Message> getChatById(@PathVariable Long id) {
        return messageService.getMessagesById(id);
    }
    

    
}
