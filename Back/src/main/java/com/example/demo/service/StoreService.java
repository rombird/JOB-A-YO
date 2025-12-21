package com.example.demo.service;

import com.example.demo.domain.entity.Store;
import com.example.demo.domain.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    // 전체 조회
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    // 매출 기준 조회
    public List<Store> getStoresBySales(Integer minSales) {
        return storeRepository.findBySalesGreaterThan(minSales);
    }
}
