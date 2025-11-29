package com.example.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@Slf4j
public class MLTestController {

    @PostMapping("/api/predict-from-ml") // server 의 엔드포인트(React가 실제로 데이터를 보내야하는 URL 경로)
    public ResponseEntity<Double> getPredictionFromML(@RequestBody Map<String, Object> payload) {
        // payload : 독립변수 이름과 값
        // {'독립변수1' : 1000, '독립변수2' : 50} JSON 데이터가 payload라는 이름의 Map 변수에 저장

        RestTemplate rt = new RestTemplate(); // RestTemplate : Fast API 서버로 HTTP 요청을 보내는 것을 쉽게 해주는 클래스

        String mlUrl = "http://localhost:8000/predict"; // Fast API 서버의 주소(Python 서버의 실제포트와 일치)

        Map<String, Object> body = new HashMap<>();
        body.put("data", Arrays.asList(payload)); // payload는 feature map

        ResponseEntity<Map> resp = rt.postForEntity(mlUrl, body, Map.class);
        List<Double> preds = (List<Double>) resp.getBody().get("predictions");
        return ResponseEntity.ok(preds.get(0));
    }
}



