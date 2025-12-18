package com.example.demo.domain.dto;

public record StoreRequest(
        String regionName, // 예: "역삼동"
        String category    // 예: "한식"
) {}
