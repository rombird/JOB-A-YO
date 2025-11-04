package com.example.demo.dto;

import com.example.demo.entity.BoardEntity;
import com.example.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String email_id;
    private String password;
    private String username;
//    private String addr;
    private String role;

    //DTO->ENTITY
    public User toEntity(){
        return User.builder()
                .username(this.username)
                .password(this.password)
                .role("ROLE_USER")
                .build();
    }

    //ENTITY->DTO
    public static UserDto toUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setEmail_id(user.getEmail_id());
        userDto.setPassword(user.getPassword());
        userDto.setUsername(user.getUsername());
        return userDto;
    }

}
