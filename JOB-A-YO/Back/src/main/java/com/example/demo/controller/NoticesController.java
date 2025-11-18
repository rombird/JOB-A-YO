package com.example.demo.controller;

import com.example.demo.domain.dto.NoticesDto;
import com.example.demo.service.NoticesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')") //관리자 권한을 가진 사용자만 가능
    public ResponseEntity<NoticesDto> createNoticesApi(@RequestBody NoticesDto dto){
        NoticesDto savedNotice = noticesService.saveNotices(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedNotice);

    }

    //4. 수정 : PUT /api/notices/{id}
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NoticesDto> updateNotices(@PathVariable Long id, @RequestBody NoticesDto dto){
        NoticesDto updateNotices = noticesService.updateNotices(id, dto);
        return ResponseEntity.ok(updateNotices);
    }

    //5. 삭제 : DELETE /api/notices/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteNoticesApi(@PathVariable Long id){
        noticesService.deleteNotices(id);
        return ResponseEntity.noContent().build(); //204 No Content return
    }

// -------------------------------------------------
// 💻 SB 통합 VER (Thymeleaf/JSP View 렌더링) - 현재 주석 처리됨
// -------------------------------------------------

/*
@Controller // @RestController 대신 @Controller 사용
@RequestMapping("/notices") // API가 아닌 일반 URL 경로
@RequiredArgsConstructor
public class NoticesIntegratedController {

    // SB 통합 버전을 활성화할 때, 이 클래스가 Controller 역할을 하며 NoticesService를 주입받음
    private final NoticesService noticesService;

    // 1. 목록 조회 (GET /notices)
    @GetMapping
    public String getAllNoticesIntegrated(
        Model model,
        @RequestParam(value = "error", required = false) String error) {

        // 에러 메시지 처리 로직 (SecurityConfig에서 리다이렉트 시 보낸 쿼리 파라미터 처리)
        if ("unauthorized".equals(error)) {
            model.addAttribute("errorMessage", "로그인이 필요합니다. 해당 기능은 인증된 사용자만 접근할 수 있습니다.");
        } else if ("forbidden".equals(error)) {
            model.addAttribute("errorMessage", "접근 권한이 없습니다. 해당 기능은 관리자(ADMIN)만 사용할 수 있습니다.");
        }

        model.addAttribute("notices", noticesService.findAllNotices());
        return "notices/list"; // HTML 파일명 반환
    }

    // 2. 상세 조회 (GET /notices/{id})
    @GetMapping("/{id}")
    public String getNoticesByIdIntegrated(@PathVariable Long id, Model model) {
        NoticesDto notice = noticesService.findNoticesDetail(id);
        model.addAttribute("notice", notice);
        return "notices/detail";
    }

    // 3. 작성 처리 (POST /notices)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String createNoticesIntegrated(@ModelAttribute NoticesDto dto) {
        noticesService.saveNotices(dto);
        return "redirect:/notices";
    }

    // 4. 수정 처리 (PUT 대신 POST 사용)
    @PostMapping("/{id}/update")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateNoticesIntegrated(@PathVariable Long id, @ModelAttribute NoticesDto dto) {
        noticesService.updateNotices(id, dto);
        return "redirect:/notices/" + id;
    }

    // 5. 삭제 처리 (POST /notices/{id}/delete)
    @PostMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteNoticesIntegrated(@PathVariable Long id) {
        noticesService.deleteNotices(id);
        return "redirect:/notices";
    }
}
*/
}


