package org.example.controller;

import org.example.constant.Constant;
import org.example.model.ResponseToken;
import org.example.model.User;
import org.example.model.UserRepository;
import org.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@RestController
public class CredentialController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Value("${credential.username}")
    private String username;

    @Value("${credential.password}")
    private String password;

    @PostMapping(Constant.API_LOGIN)
    public ResponseToken getToken(@RequestBody User user){
        Optional<User> userDb = userRepository.findByUser(user.getUser());
        if (userDb.isPresent() && userDb.get().getPassword().equals(user.getPassword())) {
            String token = jwtTokenProvider.generateToken(user.getUser());
            return new ResponseToken("Authenticated", token);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid User");
    }
}
