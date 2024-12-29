package com.example.chatapp.controller.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.entities.User;
import com.example.chatapp.services.GoogleOAuthService;
import com.example.chatapp.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final GoogleOAuthService googleOAuthService;

    public AuthController(UserService userService,GoogleOAuthService googleOAuthService) {
        this.userService = userService;
        this.googleOAuthService=googleOAuthService;
    }
    
    @PostMapping("/register")
    public User postMethodName(@RequestBody User user) {
        return userService.registerUser(user);
    }
  
    @PostMapping("/oauth2/callback")
    public ResponseEntity<?> oauth2Callback(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        if(token == null || token.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("TOken not provided");
        }
        Map<String,Object> userAttributes = googleOAuthService.validateGoogleToken(token);
        System.out.println("\n\nuser attributes"+userAttributes+"\n\n\n");

        if(userAttributes == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        String email = (String) userAttributes.get("email");
        String name = (String) userAttributes.get("name");
        User user = userService.registerOAuthUser(email,name);
        return ResponseEntity.ok(user);
    }
    
    
}
