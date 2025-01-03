package com.example.chatapp.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.chatapp.entities.User;
import com.example.chatapp.exception.UserAlreadyExistsException;
import com.example.chatapp.repositories.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
       return userRepository.save(user);
    }

    public User registerUser(User user) {
       if( userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("User already exists with this email");
        }
       user.setPassword(passwordEncoder.encode(user.getPassword()));
       user.setProvider("local");
       return userRepository.save(user);
    }

    public User registerOAuthUser(String email, String name) {
        return (userRepository.findByEmail(email)).orElseGet(()->{
            User user = new User();
            user.setEmail(email);
            user.setUsername(name);
            user.setProvider("Google");
            User savedUser = userRepository.save(user);
            System.out.println("\n\n\n\nsavd user"+savedUser+"\n\n\n");
            return savedUser;
        });
    }
    
}
