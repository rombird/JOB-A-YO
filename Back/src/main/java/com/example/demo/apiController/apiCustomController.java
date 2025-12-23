package com.example.demo.apiController;

import com.example.demo.domain.dto.StoreRequest;
import com.example.demo.domain.dto.StoreResponse;
import com.example.demo.domain.entity.Store;

import com.example.demo.service.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/stores")
public class apiCustomController {

     private final StoreService storeService;

    public apiCustomController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping("/custom")
    public ResponseEntity<StoreResponse> getStoreAnalysis(@RequestBody StoreRequest request){
        StoreResponse response = storeService.getAnalysis(request);
        return ResponseEntity.ok(response);
    }



}
