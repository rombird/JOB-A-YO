package com.example.demo.apiController;

import com.example.demo.domain.dto.NaverTrendRequestDto;
import com.example.demo.service.NaverTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NaverTrendController {
    @Autowired
    private NaverTrendService naverTrendService;

    @PostMapping("/trend")
    public ResponseEntity<Object> fetchTrend(@RequestBody NaverTrendRequestDto naverTrendRequestDto){
        Object result = naverTrendService.getTrendData(naverTrendRequestDto);

        return ResponseEntity.ok(result);
    }

}
