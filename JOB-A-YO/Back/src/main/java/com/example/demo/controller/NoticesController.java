package com.example.demo.controller;

import com.example.demo.domain.dto.NoticesDto;
import com.example.demo.service.NoticesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticesController {

    private final NoticesService noticesService;

    //1. 공지사항 목록 조회
    @GetMapping
    public ResponseEntity<List<NoticesDto>> getAllNotices(){
        List<NoticesDto> notices = noticesService.findAllNotices();
        return ResponseEntity.ok(notices);
    }
}
