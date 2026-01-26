package com.spinoff.todo.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spinoff.todo.auth.dto.SignUpRequestDTO;
import com.spinoff.todo.auth.entity.user.GoogleUser;
import com.spinoff.todo.auth.entity.user.LoginType;
import com.spinoff.todo.auth.entity.user.User;
import com.spinoff.todo.auth.repo.GoogleUserRepository;
import com.spinoff.todo.auth.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final GoogleUserRepository googleUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
public void signUp(SignUpRequestDTO req) {

    // 1️⃣ username 체크
    if (req.getUsername() == null || req.getUsername().isBlank()) {
        throw new IllegalArgumentException("아이디는 필수입니다.");
    }

    if (userRepository.existsByUsername(req.getUsername())) {
        throw new IllegalStateException("이미 사용 중인 아이디입니다.");
    }

    // 2️⃣ password 체크
    if (req.getPassword() == null || req.getPassword().length() < 8) {
        throw new IllegalArgumentException("비밀번호는 8자 이상이어야 합니다.");
    }

    // 3️⃣ nickname 체크
    if (req.getNickname() == null || req.getNickname().isBlank()) {
        throw new IllegalArgumentException("닉네임은 필수입니다.");
    }

    if (userRepository.existsByNickname(req.getNickname())) {
        throw new IllegalStateException("이미 사용 중인 닉네임입니다.");
    }

    // 4️⃣ email 체크
    if (req.getEmail() == null || req.getEmail().isBlank()) {
        throw new IllegalArgumentException("이메일은 필수입니다.");
    }

    if (userRepository.existsByEmail(req.getEmail())) {
        throw new IllegalStateException("이미 사용 중인 이메일입니다.");
    }

    // 5️⃣ 비밀번호 암호화 + 저장
    String encodedPassword = passwordEncoder.encode(req.getPassword());

    User user = new User(
        req.getUsername(),
        encodedPassword,
        req.getNickname(),
        req.getEmail(),
        LoginType.LOCAL
    );

    userRepository.save(user);
}


    // @Transactional
    // public User findOrCreateGoogleUser(String email, String googleId, String name) {

    //     // 1️⃣ 이미 구글 유저가 있는지 확인
    //     return googleUserRepository.findByGoogleId(googleId)
    //             .map(googleUser -> {
    //                 return userRepository.findByUsername(googleUser.getUsername())
    //                         .orElseThrow(() -> new IllegalStateException("Linked user not found"));
    //             })
    //             .orElseGet(() -> {
    //                 // 2️⃣ 없으면 새로 생성

    //                 // LOCAL User 생성 (password 없음 → 랜덤값 or 더미)
    //                 User user = new User(
    //                         email,
    //                         "GOOGLE_USER" // 실제 로그인에 사용 안 됨
    //                         name,
    //                         email
    //                 );
    //                 userRepository.save(user);

    //                 // GoogleUser 생성
    //                 GoogleUser googleUser = new GoogleUser(
    //                         name,
    //                         email,
    //                         googleId);
    //                 googleUserRepository.save(googleUser);

    //                 return user;
    //             });
    // }



}
