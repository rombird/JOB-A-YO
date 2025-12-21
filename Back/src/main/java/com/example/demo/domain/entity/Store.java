package com.example.demo.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "address")
    private String address;

    @Column(name = "sales")
    private Integer sales;

    // JPA는 기본 생성자가 반드시 필요
    protected Store() {}

    public Store(String storeName, String address, Integer sales) {
        this.storeName = storeName;
        this.address = address;
        this.sales = sales;
    }

    // getter만 있어도 충분 (불변 객체 권장)
    public String getStoreName() { return storeName; }
    public String getAddress() { return address; }
    public Integer getSales() { return sales; }
}
