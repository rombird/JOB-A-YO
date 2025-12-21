package com.example.demo.service;

import com.example.demo.domain.entity.Store;
import com.example.demo.domain.repository.StoreRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class CsvImportService {

    private final StoreRepository storeRepository;

    // @PostConstruct : 서버가 시작되고 의존성 주입이 완료된 후 자동으로 이 메소드 실행
    @PostConstruct
    public void init() {
        if (storeRepository.count() > 0){
            System.out.println(">>> 이미 데이터가 존재하여 CSV 임포트를 건너뜁니다.");
            return;
        }
        try {
            importCsv();
        } catch (IOException e) {
            System.err.println("CSV 임포트 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void importCsv() throws IOException {

        // resources 바로 아래에 파일 존재
        ClassPathResource resource = new ClassPathResource("24년_상권분석_데이터.csv");
        if (!resource.exists()){
            System.err.println("파일을 찾을 수 없습니다! 경로를 확인하세요.");
            return;
        }
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), Charset.forName("MS949")))) {

            String line;
            boolean isFirstLine = true;
            int count = 0; // 저장된 건수를 셀 변수

            while ((line = br.readLine()) != null) {
                // 첫 줄은 헤더라서 스킵
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] values = line.split(",");
                if (values.length < 17) continue; // 데이터 누락 방지를 위한 최소 길이 체크

                try {
                    // CSV 컬럼 순서에 맞게 매핑
                    Store store = new Store(
                            values[2].trim(),                 // 행정동
                            values[4].trim(),                 // 업종 명
                            values[12].trim(),                // 점포증감률
                            values[13].trim(),                // 경쟁도지수
                            values[14].trim(),                // 업종면적밀도
                            values[15].trim(),                // 점포당 유동인구
                            values[16].trim()                // 전망등급
                    );
                    storeRepository.save(store);
                    count++;
                } catch (Exception e) {
                    System.err.println("줄 읽기 실패 (건너뜀): " + line);
                }
            }
            System.out.println(">>> CSV 임포트 완료! 총 " + count + "건의 데이터가 저장되었습니다.");
        }
    }

}
