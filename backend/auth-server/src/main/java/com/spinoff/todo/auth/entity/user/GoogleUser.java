package com.spinoff.todo.auth.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "google_users", uniqueConstraints = {
        @UniqueConstraint(name = "uk_google_id", columnNames = "google_id")
})
@Getter
@NoArgsConstructor
public class GoogleUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(name = "google_id", nullable = false, length = 255)
    private String googleId;

    public GoogleUser(String username, String email, String googleId) {
        this.username = username;
        this.email = email;
        this.googleId = googleId;
    }
}
