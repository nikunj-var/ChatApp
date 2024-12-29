package com.example.chatapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entities.User;

public interface UserRepository extends JpaRepository<User,Long>{

    Optional<User> findByEmail(String email);
    
}
