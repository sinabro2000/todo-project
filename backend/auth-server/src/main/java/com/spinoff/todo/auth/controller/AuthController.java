package com.spinoff.todo.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
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
        // 1. 구글 토큰 검증
        GoogleIdToken.Payload payload = googleTokenVerifier.verify(request.getIdToken());
        if (payload == null) {
            return ResponseEntity.status(401).body("Invalid Google Token");
        }

        // 2. 유저 처리 (조회 또는 자동 가입)
        User user = userService.findOrCreateGoogleUser(
                payload.getEmail(),
                (String) payload.get("name"));

        // 3. 우리 서비스 전용 토큰 발행
        String token = jwtTokenProvider.createToken(user.getUsername());
        System.out.println(token);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            User user = userService.findByUsername(username);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }

}