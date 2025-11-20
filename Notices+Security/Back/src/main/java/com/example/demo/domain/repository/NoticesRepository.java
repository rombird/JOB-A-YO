package com.example.demo.domain.repository;

import com.example.demo.domain.entity.NoticesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface NoticesRepository extends JpaRepository<NoticesEntity, Long> {

    @Modifying // 데이터를 변경하는 쿼리임을 명시
    @Transactional // 트랜잭션 내에서 실행되도록 명시
    @Query("UPDATE NoticesEntity n SET n.noticesViews = n.noticesViews + 1 WHERE n.id = :id")
    void updateViews(@Param("id") Long id); // @Param을 사용하여 :id에 파라미터 바인딩


}