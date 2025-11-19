package com.example.demo.config.auth.jwt;


import com.example.demo.domain.dto.TokenInfo;
import com.example.demo.domain.entity.Signature;
import com.example.demo.domain.repository.SignatureRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    // DB 연동을 위해 주입
    private final SignatureRepository signatureRepository;

    private Key key; // @PostConstruct에서 초기화하므로 final 제거

    // 🌟 수정 1: Filter에서 JWT 서명 키를 가져갈 수 있도록 getKey() 메서드 추가 🌟
    public Key getKey() {
        return key;
    }


    // @PostConstruct 초기화 메서드 (KeyGenerator + DB 관리)
    @PostConstruct
    public void init() {
        // 1. DB에서 기존 서명 키 조회
        List<Signature> list = signatureRepository.findAll();

        if (list.isEmpty()) {
            // 2. 키가 없으면 KeyGenerator로 난수 키 생성 후 DB에 저장
            byte[] keyBytes = KeyGenerator.keyGen(); // KeyGenerator 호출
            this.key = Keys.hmacShaKeyFor(keyBytes);

            Signature signature = new Signature();
            signature.setKeyBytes(keyBytes);
            signature.setCreateAt(LocalDate.now());
            signatureRepository.save(signature);
            log.warn("새로운 서명 키를 생성하여 DB에 저장했습니다. 이 키는 운영 환경에서 매우 중요합니다.");

        } else {
            // 3. 키가 있으면 기존 키를 로드하여 사용
            Signature signature = list.get(0);
            this.key = Keys.hmacShaKeyFor(signature.getKeyBytes());
            log.info("DB에서 기존 서명 키를 로드했습니다.");
        }
    }

    /**
     * Authentication 객체를 받아 Access Token과 Refresh Token을 생성
     */
    public TokenInfo generateToken(Authentication authentication) {
        // 권한 정보 가져오기(문자열로 반환)
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();

        //Access Token 만료시간
        Date accessTokenExpiresIn = new Date(now + JWTProperties.ACCESS_TOKEN_EXPIRATION_TIME);

        // 1. Access Token 생성 (JWTProperties 사용)
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities) // 권한 정보 클레임
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256) //서버만 아는 key로 서명
                .compact(); //문자열 JWT로 변환


        //Refresh Token 만료시간
        Date refreshTokenExpiresIn = new Date(now + JWTProperties.REFRESH_TOKEN_EXPIRATION_TIME);

        // 2. Refresh Token 생성 (JWTProperties 사용)
        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // 3. AccessToken 과 RefreshToken을 TokenInfo 객체로 묶어 반환
        return TokenInfo.builder()
                .grantType("Bearer") //토큰 타입(Bearer)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    //Access Token에서 사용자 인증 정보 추출(Filter에서 사용됨)
    public Authentication getAuthentication(String accessToken){

        Claims claims = parseClaims(accessToken);
        //auth 클레임 x == 권한 정보 없는 토큰 => 에러
        if (claims.get("auth") == null){
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }
        //문자열로 반환했던 권한들을 객체로 변환
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        //UsernamePasswordAuthenticationToken : 인증된 사용자 객체
        //credentials(null) -> 비밀번호는 필요 없음
        return new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities);

    }

    //토큰 유효성 검증
    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.", e);
        } catch (ExpiredJwtException e) {
            // ExpiredJwtException 발생 시에도 parseClaims에서 클레임을 가져와야 하므로 여기서 true 반환하지 않음
            log.info("만료된 JWT 토큰입니다.", e);
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.", e);
        }
        return false;
    }

    //만료된 토큰 클레임도 추출 가능
    private Claims parseClaims(String accessToken){
        try{
            //정상 토큰이면 claims 바로 반환
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        }catch(ExpiredJwtException e){
            //Refresh 로직을 위해 만료된 토큰 클레임 반환
            return e.getClaims();
        }
    }
}