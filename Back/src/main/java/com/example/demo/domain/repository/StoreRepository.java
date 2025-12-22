package com.example.demo.domain.repository;

import com.example.demo.domain.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    // 행정동과 업종 명 일치하는 데이터 1건 찾기
    Optional<Store> findByDongNameAndCategoryName(String dongName, String categoryName);
}
