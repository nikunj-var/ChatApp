package com.example.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.chatapp.entities.User;
import com.example.chatapp.repositories.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }
    
}
