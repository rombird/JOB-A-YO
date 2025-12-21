package com.example.demo.domain.repository;

import com.example.demo.domain.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    // storeName으로 조회
    List<Store> findByStoreName(String storeName);

    // 매출이 특정 값 이상인 가게 조회
    List<Store> findBySalesGreaterThan(Integer sales);
}
