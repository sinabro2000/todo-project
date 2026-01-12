package com.spinoff.todo.auth.dto;

import lombok.Data;

@Data
public class SignUpRequestDTO {
    private String username;
    private String password;
}
