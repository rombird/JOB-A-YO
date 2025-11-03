package com.example.demo.controller;



import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequestMapping("/user")
@Tag(name="UserController", description="This is User Controller")
public class UserController {

    @Operation(summary="login", description = "LOGIN")
    @GetMapping("/login")
    public String login(){
        log.info("get/ 로그인 페이지/ UserController");
        return "user/login";
    }

    @Operation(summary="join", description = "JOIN")
    @GetMapping("/join")
    public String join(){
        log.info("get/ 회원가입 페이지/ UserController");
        return "user/join";
    }

}
