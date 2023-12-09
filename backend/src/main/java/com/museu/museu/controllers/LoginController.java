package com.museu.museu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.museu.museu.domain.Usuario;
import com.museu.museu.dto.DadosLogin;
import com.museu.museu.dto.Token;
import com.museu.museu.services.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<Object> login(@Valid @RequestBody DadosLogin dados) {
        System.out.println(dados);
        Authentication authentication = null;
        String token = null;
        var authToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        try {
            authentication = authManager.authenticate(authToken);
            token = tokenService.getToken((Usuario) authentication.getPrincipal());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(new ErrorResponse("Login ou senha inválidos."));
        }

        return ResponseEntity.ok(new Token(token));
    }

    public static class ErrorResponse {
        private final String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

}
