package com.example.demo.domain.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//공지사항 TBL 역할
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notices_table")
public class NoticesEntity extends BaseEntity { //RDBMS TB 표현, JPA가 이 클래스를 테이블로 인식하여 관리가능

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;

    @Column(nullable=false)
    private String noticesTitle;

    @Lob //긴 텍스트 저장
    @Column(nullable=false)
    private String noticesContents;




    }
