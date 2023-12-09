package com.museu.museu.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.museu.museu.domain.Usuario;

@Service
public class TokenService {

    @Value("${JWT.SECRET}")
    private String secret;

    public String getToken(Usuario user) {

        try {
            var algoritmo = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("MUSEU5599 API")
                    .withSubject(user.getEmail())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000000))
                    .sign(algoritmo);

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao criar token.");
        }

    }

    public String getSubject(String token) {
        try {
            var algoritmo = Algorithm.HMAC256(secret);
            return JWT.require(algoritmo)
                    .withIssuer("MUSEU5599 API")
                    .build()
                    .verify(token).getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Erro ao verificar token.");
        }
    }

}
