package com.example.demo.domain.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//공지사항 TBL 역할
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notices_table")
public class NoticesEntity {
}
