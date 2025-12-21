package com.example.demo.service;

import com.example.demo.domain.entity.Store;
import com.example.demo.domain.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class CsvImportService {

    private final StoreRepository storeRepository;

    public void importCsv() throws IOException {

        // resources/csv/sample.csv 접근
        ClassPathResource resource = new ClassPathResource("csv/sample.csv");

        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {

                // 첫 줄은 헤더라서 스킵
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] values = line.split(",");

                // CSV 컬럼 순서에 맞게 매핑
                Store store = new Store(
                        values[0],                 // store_name
                        values[1],                 // address
                        Integer.parseInt(values[2])// sales
                );

                storeRepository.save(store);
            }
        }
    }

}
