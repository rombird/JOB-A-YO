package com.example.demo.controller;

import com.example.demo.domain.dto.NoticesDto;
import com.example.demo.service.NoticesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//REACT 분리 VER.
@RestController
@RequestMapping("/api/notices") //-> JSON 반환 -> React에서 화면 렌더링
@RequiredArgsConstructor
public class NoticesController {

    private final NoticesService noticesService;

    //1. 공지사항 목록 조회: GET /api/notices
    @GetMapping
    public ResponseEntity<List<NoticesDto>> getAllNotices(){
        List<NoticesDto> notices = noticesService.findAllNotices();
        return ResponseEntity.ok(notices);
    }

    //2. 상세 조회 및 조회수 증가 READ + UPDATE : GET /api/notices/{id}
    @GetMapping("/{id}")
    public ResponseEntity<NoticesDto> getNoticesByIdApi(@PathVariable Long id){
        NoticesDto notice = noticesService.findNoticesDetail(id);
        return ResponseEntity.ok(notice); //JSON 데이터 반환
    }

    //3. 작성 : POST /api/notices
    @PostMapping
    public ResponseEntity<NoticesDto> createNoticesApi(@RequestBody NoticesDto dto){
        NoticesDto savedNotice = noticesService.saveNotices(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedNotice);

    }

    //4. 수정 : PUT /api/notices/{id}
    @PutMapping("/{id}")
    public ResponseEntity<NoticesDto> updateNotices(@PathVariable Long id, @RequestBody NoticesDto dto){
        NoticesDto updateNotices = noticesService.updateNotices(id, dto);
        return ResponseEntity.ok(updateNotices);
    }

    //5. 삭제 : DELETE /api/notices/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoticesApi(@PathVariable Long id){
        noticesService.deleteNotices(id);
        return ResponseEntity.noContent().build(); //204 No Content return
    }

}

//-------------------------------------------------
//SB 통합 VER
//-------------------------------------------------
