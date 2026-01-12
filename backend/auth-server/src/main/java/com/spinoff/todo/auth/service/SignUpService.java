package com.spinoff.todo.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spinoff.todo.auth.dto.SignUpRequestDTO;
import com.spinoff.todo.auth.entity.User;
import com.spinoff.todo.auth.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignUpService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public void signUp(SignUpRequestDTO req) {

        
        String encodedPassword = passwordEncoder.encode(req.getPassword());
        User user = new User(req.getUsername(), encodedPassword);
        userRepo.save(user);


    }

}
