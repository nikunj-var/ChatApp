package com.example.chatapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entities.Message;

public interface MessageRepository extends JpaRepository<Message,Long>{
    
}
