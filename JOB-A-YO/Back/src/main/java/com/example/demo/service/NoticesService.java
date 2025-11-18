package com.example.demo.service;

import com.example.demo.domain.dto.NoticesDto;
import com.example.demo.domain.entity.NoticesEntity;
import com.example.demo.domain.repository.NoticesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticesService {
    public final NoticesRepository noticesRepository;

    //1. 공지사항 목록조회
    @Transactional(readOnly = true)
    public List<NoticesDto> findAllNotices(){
        //DB에서 가져온 여러 Entity를 Stream으로 순회
        return noticesRepository.findAll().stream()
                //하며 DTO로 변환
                .map(NoticesDto::fromEntity)
                //List(여러 개의 DTO전달을 위해)로 다시 모아 프론트로 전달
                .collect(Collectors.toList());


    }

    //2. 상세 조회 및 조회수 증가 READ + UPDATE
    @Transactional
    public NoticesDto findNoticesDetail(Long id){

        //엔티티 조회( + 예외발생)
        NoticesEntity entity = noticesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notices not found with id : " + id));

        //조회수 증가 쿼리 호출(DB에서 1증가 처리)
        noticesRepository.updateViews(id);

        //조회된 Entity -> Dto 후 return
        return NoticesDto.fromEntity(entity);
    }

    //3. 작성(Create)
    @Transactional
    public NoticesDto saveNotices(NoticesDto dto){
        // 현재 로그인된 사용자의 ID(Username) 자동 삽입
        String currentAdminUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        // DTO의 작성자 필드를 현재 로그인된 관리자 ID로 덮어씌웁니다.
        dto.setAuthor(currentAdminUsername);
        NoticesEntity savedEntity = noticesRepository.save(NoticesEntity.fromDto(dto));
        //저장된 Entity-> DTO
        return NoticesDto.fromEntity(savedEntity);
    }

    //4. 수정(Update)
    @Transactional
    public NoticesDto updateNotices(Long id, NoticesDto dto){
        NoticesEntity trueEntity = noticesRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Notices not found with id : " + id));

        trueEntity.updateFromDto(dto); //title(제목), contents(내용) 변경
        return NoticesDto.fromEntity(trueEntity);
    }

    //5. 삭제(Delete)
    @Transactional
    public void deleteNotices(Long id){
        noticesRepository.deleteById(id);
    }






}
