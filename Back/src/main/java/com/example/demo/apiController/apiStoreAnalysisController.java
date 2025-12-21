package com.example.demo.apiController;

import com.example.demo.domain.dto.StoreRequest;
import com.example.demo.domain.entity.Store;

import com.example.demo.service.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/stores")
public class apiStoreAnalysisController {

    private final StoreService storeService;

    public apiStoreAnalysisController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping("/count")
    public ResponseEntity<Integer> getStoreCount(@RequestBody StoreRequest request) {
        // 여기서 크롤링을 하거나 API를 호출합니다.
        // 임시로 42개라고 보내볼게요.
        int count = 42;
        return ResponseEntity.ok(count);
    }

    // 전체 가게 조회
    @GetMapping
    public List<Store> getStores() {
        return storeService.getAllStores();
    }

    // 매출 기준 조회
    @GetMapping("/sales")
    public List<Store> getStoresBySales(@RequestParam Integer minSales) {
        return storeService.getStoresBySales(minSales);
    }

}
