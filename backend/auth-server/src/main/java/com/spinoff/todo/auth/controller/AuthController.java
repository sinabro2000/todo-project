package com.spinoff.todo.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.spinoff.todo.auth.dto.GoogleLoginRequest;
import com.spinoff.todo.auth.dto.JwtResponse;
import com.spinoff.todo.auth.dto.LoginRequestDTO;
import com.spinoff.todo.auth.entity.user.User;
import com.spinoff.todo.auth.service.GoogleTokenVerifier;
import com.spinoff.todo.auth.service.UserService;
import com.spinoff.todo.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleTokenVerifier googleTokenVerifier;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        String username = auth.getName();
        String token = jwtTokenProvider.createToken(username);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        GoogleIdToken.Payload payload = googleTokenVerifier.verify(request.getIdToken());
        String email = payload.getEmail();
        String googleId = payload.getSubject();
        String name = (String) payload.get("name");

        User user = userService.findOrCreateGoogleUser(
                email,
                googleId,
                name);
 

        String token = jwtTokenProvider.createToken(user.getUsername());

        return ResponseEntity.ok(new JwtResponse(token));

    }
}