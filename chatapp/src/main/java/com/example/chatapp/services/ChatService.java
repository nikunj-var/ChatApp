package com.example.chatapp.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.chatapp.entities.Chat;
import com.example.chatapp.entities.User;
import com.example.chatapp.exception.NotFoundException;
import com.example.chatapp.repositories.ChatRepository;
import com.example.chatapp.repositories.UserRepository;

@Service
public class ChatService {
    private UserRepository userRepository;
    private ChatRepository chatRepository;

    public ChatService(UserRepository userRepository, ChatRepository chatRepository) {
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }

    public Chat createChat(Long userId1,Long userId2){
        User user1 = userRepository.findById(userId1).orElseThrow(()->new NotFoundException("User1 not found"));
        User user2 = userRepository.findById(userId2).orElseThrow(()->new NotFoundException("User2 not found"));
        
        Optional<Chat> existingChat = chatRepository.findByUser1AndUser2(user1,user2);

        if(existingChat.isPresent()){
            return existingChat.get();
        }

        Chat chat = new Chat();
        chat.setUser1(user1);
        chat.setUser2(user2);
        Chat ans = chatRepository.save(chat);
        return ans;
    }

    
    
}
