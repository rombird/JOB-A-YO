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

    //조회수 증가
    @Modifying
    @Query(value = "update NoticesRepository n set n.noticesViews = n.noticesViews + 1 where n.id = :id")
    void updateViews(@Param("id") Long id);
}
