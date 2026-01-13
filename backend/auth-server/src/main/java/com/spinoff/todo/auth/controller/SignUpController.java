    package com.spinoff.todo.auth.controller;

    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    import com.spinoff.todo.auth.dto.SignUpRequestDTO;

    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;

    import com.spinoff.todo.auth.service.UserService;

    import lombok.RequiredArgsConstructor;


    @RestController
    @RequestMapping("/auth")
    @RequiredArgsConstructor
    public class SignUpController {

        private final UserService userService;


        @PostMapping("/signup")
        public void signUp(@RequestBody SignUpRequestDTO req) {
            userService.signUp(req);
        }
        
    }
