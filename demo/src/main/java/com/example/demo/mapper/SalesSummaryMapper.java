package com.example.demo.mapper;

import com.example.demo.domain.dto.Vo.SalesSummaryVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


//DB에 직접 접근하여 SQL을 실행(repository 역할)


@Mapper
public interface SalesSummaryMapper {

    // 우리가 만든 SQL 쿼리를 Native Query로 실행
    @Select("SELECT " +
            "월평균_매출액 AS monthlyAverageSales, " + // 영문 필드명과 일치하는 별칭 사용
            "전분기_대비_증감액 AS qoqChange, " +         // 영문 필드명과 일치하는 별칭 사용
            "전년_동분기_대비_증감액 AS yoyChange " +     // 영문 필드명과 일치하는 별칭 사용
            "FROM sales_gu_summary " +
            "WHERE 자치구_코드_명 = #{guName} " +
            "AND 기준_년분기_코드 = #{qtrCode}")
    SalesSummaryVo getSalesSummary(
            @Param("guName") String guName,
            @Param("qtrCode") String qtrCode
    );
}
