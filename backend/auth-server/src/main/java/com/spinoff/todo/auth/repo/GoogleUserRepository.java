package com.spinoff.todo.auth.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spinoff.todo.auth.entity.user.GoogleUser;

public interface GoogleUserRepository extends JpaRepository<GoogleUser, Long> {
    Optional<GoogleUser> findByGoogleId(String googleId);
}
