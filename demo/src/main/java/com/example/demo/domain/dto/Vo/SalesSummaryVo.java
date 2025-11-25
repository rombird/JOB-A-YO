package com.example.demo.domain.dto.Vo;


//Mapper가 DB 결과를 매핑할 때 사용하는 객체 (DB 컬럼 이름과 일치) (MyBatis 전용)
//CRUD 기능을 하는 JPA와 달리 VO는 데이터를 읽어와서 자바 객체에 담는 데이터 컨테이너 역할만 함

import lombok.Data;


//DB에서 조회된 컬럼 이름과 일치해야함
@Data
public class SalesSummaryVo {
    // 한글 변수명을 영문으로 변경합니다.
    private long monthlyAverageSales; // 월평균_매출액
    private long qoqChange;           // 전분기_대비_증감액
    private long yoyChange;           // 전년_동분기_대비_증감액
}
