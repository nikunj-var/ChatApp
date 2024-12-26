package com.example.chatapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.chatapp.entities.Chat;
import com.example.chatapp.entities.User;

public interface ChatRepository extends JpaRepository<Chat,Long>{

    Optional<Chat> findByUser1AndUser2(User user1, User user2);

    @Query("Select c from Chat c where (c.user1 = :user1 and c.user2  =:user2) or (c.user1 = :user2 and c.user2 = :user1)")
    Optional<Chat> findByUsers(@Param("user1") User user1,@Param("user2") User user2);

    
} 