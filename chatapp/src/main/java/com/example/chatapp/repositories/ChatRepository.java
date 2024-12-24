package com.example.chatapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entities.Chat;
import com.example.chatapp.entities.User;

public interface ChatRepository extends JpaRepository<Chat,Long>{

    Optional<Chat> findByUser1AndUser2(User user1, User user2);

    
} 