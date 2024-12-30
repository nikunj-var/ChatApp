package com.example.chatapp.controller.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.entities.User;
import com.example.chatapp.exception.UserAlreadyExistsException;
import com.example.chatapp.services.GoogleOAuthService;
import com.example.chatapp.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
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
    public ResponseEntity<?> register(@RequestBody User user) {
        try{
            User registeredUser = userService.registerUser(user);
            Map<String,String> mp = new HashMap<>();
            mp.put("username", registeredUser.getUsername());
            mp.put("email", registeredUser.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(mp);
        }catch(UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User doesn't registered");
        }
    }

    @PostMapping("/oauth2/callback")
    public ResponseEntity<?> oauth2Callback(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        if(token == null || token.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token not provided");
        }
        Map<String,Object> userAttributes = googleOAuthService.validateGoogleToken(token);
        if(userAttributes == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        String email = (String) userAttributes.get("email");
        String name = (String) userAttributes.get("name");
        User user = userService.registerOAuthUser(email,name);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<Object,String> credentials) {
        try{
            String email = credentials.get("email");
            String password = credentials.get("password");
            if(email == null || password == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email or password not provided");
            }
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("ok");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error logging in!");
        }
    }
    
    
}
