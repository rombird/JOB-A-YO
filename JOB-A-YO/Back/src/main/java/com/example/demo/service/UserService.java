package com.example.demo.service;

import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User create(String id, String username, String password, String addr_sido) {
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setAddr_sido(addr_sido);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(password));
//        user.setAddr(addr);
        this.userRepository.save(user);
        return user;
    }
}
