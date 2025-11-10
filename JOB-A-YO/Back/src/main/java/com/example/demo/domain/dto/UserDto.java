package com.example.demo.domain.dto;

import com.example.demo.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String id;
    private String username;
    private String password;
    private String addr_sido;
    private String role;

    //OAUTH2 CLIENT INFO
    private String provider;
    private String providerId;

    // DTO → Entity
    public User toEntity(){
        return User.builder()
                .id(this.id)
                .username(this.username)
                .password(this.password)
                .addr_sido(this.addr_sido)
                .role("ROLE_USER")
                .build();
    }

    // Entity → DTO
    public static UserDto toUserDto(User user){
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .addr_sido(user.getAddr_sido())
                .role(user.getRole())
                .build();
    }

}
