package com.example.demo.controller;



import com.example.demo.dto.UserDto;
import com.example.demo.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;

@Controller
@Slf4j
@Tag(name="UserController", description="This is User Controller")
public class UserController {

    @Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;


    @Operation(summary="login", description = "LOGIN")
    @GetMapping("/login")
    public String login(){
        log.info("get/ 로그인 페이지/ UserController");

//        if(authentication!=null&& authentication.isAuthenticated()){
//			return "redirect:/";
//		}

        return "login";
    }

//    @GetMapping("/user")
//    public void user(Authentication authentication) {
//        log.info("GET /user..." + authentication);
//        log.info("name..." + authentication.getName());
//        log.info("principal..." + authentication.getPrincipal());
//        log.info("authorities..." + authentication.getAuthorities());
//        log.info("details..." + authentication.getDetails());
//        log.info("credential..." + authentication.getCredentials());
//    }

//    @GetMapping("/user")
//	public void user(@AuthenticationPrincipal Principal principal) {
//		log.info("GET /user..." + principal);
//	}


    @Operation(summary="join", description = "JOIN")
    @GetMapping("/join")
    public String join(){
        log.info("get/ 회원가입 페이지/ UserController");
        return "join";
    }

    @PostMapping("/join")
	public String join_post(UserDto dto, RedirectAttributes redirectAttributes ) {
		log.info("POST /join.." + dto);

		//DTO->ENTITY(DB저장) , ENTITY->DTO(뷰로전달)
		dto.setPassword(  passwordEncoder.encode( dto.getPassword() ) );
		userRepository.save(dto.toEntity());

		boolean isJoin  = true;
		if(isJoin) {
			redirectAttributes.addFlashAttribute("message","회원가입 완료!");
			return "redirect:/login";
		}
		else
			return "join";
	}


}
