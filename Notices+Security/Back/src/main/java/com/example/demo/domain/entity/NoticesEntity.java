package com.example.demo.domain.entity;


import com.example.demo.domain.dto.NoticesDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


//공지사항 TBL 역할
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notices_table")
@Builder
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

    //조회수
    @Column(nullable= true)
    private int noticesViews;

    //Dto -> Entity 변환
    public static NoticesEntity fromDto(NoticesDto noticesDto) {
        return NoticesEntity.builder()
                .author(noticesDto.getAuthor())
                .noticesTitle(noticesDto.getNoticesTitle())
                .noticesContents(noticesDto.getNoticesContents())
                .noticesViews(0) //새 공지 작성 시 조회수는 0 초기화
                .build();
    }

    // title, Contents만 외부에서 변경가능하도록(조회수, 생성일은 X)
    public void updateFromDto(NoticesDto dto){
        this.noticesTitle = dto.getNoticesTitle();
        this.noticesContents = dto.getNoticesContents();
        //updatedTime은 @UpdateTimestamp를 통해 자동 갱신
    }




    }
