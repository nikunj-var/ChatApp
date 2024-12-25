package com.example.chatapp.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.chatapp.entities.Chat;
import com.example.chatapp.entities.Message;
import com.example.chatapp.entities.User;
import com.example.chatapp.exception.NotFoundException;
import com.example.chatapp.repositories.ChatRepository;
import com.example.chatapp.repositories.MessageRepository;

@Service
public class MessageService {
    private ChatRepository chatRepository;
    private MessageRepository messageRepository;

    
    public MessageService(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }


    public Message sendMessage(Long chatId,Long senderId, String content){
        System.out.println("\n\n\n\nchat"+chatRepository.findById(chatId)+"\n\n\n");
        Chat chat = chatRepository.findById(chatId).orElseThrow(()->new NotFoundException("chat not found!"));
        
        Message message = new Message();
        message.setTimestamp(new Timestamp(System.currentTimeMillis()));
        message.setUser(new User(senderId));
        message.setChat(chat);
        message.setContent(content);
        return messageRepository.save(message);
    }

    public List<Message> getMessagesById(Long chatId){
        Chat chat =  chatRepository.findById(chatId).orElseThrow(()->new NotFoundException("chat not found"));
        return messageRepository.findByChat(chat);
    }
}
