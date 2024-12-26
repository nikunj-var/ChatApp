package com.example.chatapp.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.entities.Chat;
import com.example.chatapp.services.ChatService;

import org.apache.commons.logging.Log;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/chat")
public class ChatController {

    private ChatService chatService;
    
    
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/createChat/{userId1}/{userId2}")
    public Chat createChat(@PathVariable Long userId1, @PathVariable Long userId2) {
        System.out.println("\n\n\n\n\n userid"+userId1+userId2);
        return chatService.createChat(userId1, userId2);
    }
        
}
