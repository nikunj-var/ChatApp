package com.example.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entities.Chat;
import com.example.chatapp.entities.Message;

public interface MessageRepository extends JpaRepository<Message,Long>{

    List<Message> findByChat(Chat chat);
    
}
