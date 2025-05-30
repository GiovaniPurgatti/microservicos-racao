package org.example.controllers;

import org.example.constants.Constant;
import org.example.models.LoginRequest;
import org.example.models.ResponseToken;
import org.example.models.Usuario;
import org.example.repositories.UsuarioRepository;
import org.example.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.POST})
public class CredentialController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping(Constant.API_LOGIN)
    public ResponseEntity<ResponseToken> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(loginRequest.getUsername());
        
        if (usuario.isPresent() && usuario.get().getSenha().equals(loginRequest.getSenha())) {
            String token = jwtTokenProvider.generateToken(usuario.get().getUsername(), usuario.get().getId());
            return ResponseEntity.ok(new ResponseToken("Authenticated", token));
        }
        
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }
}
