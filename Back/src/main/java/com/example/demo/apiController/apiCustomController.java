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
public class apiCustomController {

     private final StoreService storeService;

    public apiCustomController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping("/count")
    public ResponseEntity<String> getStoreCount(@RequestBody StoreRequest request){
        String resultSentence = storeService.getAnalysisSentence(request);
        return ResponseEntity.ok(resultSentence);
    }



}
