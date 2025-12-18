package com.example.demo.apiController;

import com.example.demo.domain.dto.StoreRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/stores")
public class apiStoreAnalysisController {
    @PostMapping("/count")
    public ResponseEntity<Integer> getStoreCount(@RequestBody StoreRequest request) {
        // 여기서 크롤링을 하거나 API를 호출합니다.
        // 임시로 42개라고 보내볼게요.
        int count = 42;
        return ResponseEntity.ok(count);
    }

}
