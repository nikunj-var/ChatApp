package com.example.chatapp.services;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleOAuthService {
    private final RestTemplate restTemplate;
    private final String googleClientId;
    public GoogleOAuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.googleClientId = "1049689165819-no18at0pj7kfko1b9blil1te21ifbof1.apps.googleusercontent.com";
    }
    
    public Map<String,Object> validateGoogleToken(String token){
        String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
        try{
            ResponseEntity<Map> response = restTemplate.getForEntity(url,Map.class );
            if(response.getStatusCode().is2xxSuccessful()){
                Map<String,Object> responseBody = response.getBody();
                String clientId = (String)responseBody.get("aud");
                if(googleClientId.equals(clientId)){
                    return responseBody;
                }else{
                    throw new IllegalArgumentException("Invalid Client Id in token");
                }
            }else{
                throw new IllegalArgumentException("Token Validation failed");
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
