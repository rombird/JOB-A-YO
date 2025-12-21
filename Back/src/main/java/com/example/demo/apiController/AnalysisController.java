package com.example.demo.apiController;

import com.example.demo.domain.dto.RevenuePredictionResponseDto;
import com.example.demo.domain.dto.SuccessRateResponseDto;
import com.example.demo.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    @GetMapping("/predict")
    public ResponseEntity<RevenuePredictionResponseDto> predict(@RequestParam String dong, @RequestParam String sector){
        RevenuePredictionResponseDto revenuePredictionResponseDto = analysisService.getPrediction(dong, sector);

        return ResponseEntity.ok(revenuePredictionResponseDto);
    }

    @GetMapping("/success-rate")
    public ResponseEntity<SuccessRateResponseDto> getSuccessRate(@RequestParam String dong, @RequestParam String sector){
        SuccessRateResponseDto successRateResponseDto = analysisService.getSuccessRate(dong, sector);

        return ResponseEntity.ok(successRateResponseDto);
    }
}
