package com.spinoff.todo.auth.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spinoff.todo.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {


    //로그인 용
    Optional<User> findByUsername(String username);
    
    //중복체크
    boolean existsByUsername(String username);
}
