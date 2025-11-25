package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

//Spring Boot에게 지정된 패키지에 있는 Mapper 인터페이스를 자동으로 스캔하고 등록하라는 지시
@MapperScan(basePackages = "com.example.demo.mapper")
////이 패키지(com.example.demo.mapper)에 있는 인터페이스들은 MyBatis의 Mapper이니
////스캔해서 자동으로 빈(Bean)으로 등록하고, DB 연결을 준비해줘!

public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
