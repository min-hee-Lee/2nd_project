package com.example.shop.login.config.AuthenticationFilter.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.shop.login.config.AuthenticationFilter.TokenMapping;
import com.example.shop.login.dto.User;


@Service
public class JwtService {

	private final String PREFIX = "Bearer ";
	private final String BLANK = "";
	private String secret = "myCorsTest";
	private long accessTokenVaildationSeconds = 60*60*1L; // 
	private long refreshTokeVaildationSeconds = 60*60*2L;
	private String accessHeader = "Authorization";
	private String refreshHeader = "AuthorizationRefresh";
	
	//토큰 생성
	public String createAccessToken(User user) {
		
		System.out.println("토큰생성");
		
		return PREFIX.concat(JWT.create()
				.withSubject("AccessToken")
				.withExpiresAt(new Date(System.currentTimeMillis()+accessTokenVaildationSeconds*3000))//9분
				.withClaim("t_id", user.getT_id())
				.withClaim("t_username", user.getT_username())
				.withClaim("t_role",user.getT_role())
				.sign(Algorithm.HMAC512(secret))
				);
		
	}
	
	
	//토큰 생성
	public String createRefreshToken() {
		
		System.out.println("리플래쉬 토큰 생성");
		
		return PREFIX.concat(JWT.create()
				.withSubject("RefreshToken")
				.withExpiresAt(new Date(System.currentTimeMillis()+refreshTokeVaildationSeconds*1000)) // 6분?
				.sign(Algorithm.HMAC512(secret))
				
				);
	}
	
	//response.header 를 통해 token 전송
	public void sendBothToken(HttpServletResponse response, String accessToken, String refreshToken) {
		
		setAccessTokenInHeader(response, accessToken);
		setRefreshTokenInHeader(response, refreshToken);
		
	}
	
	
	//response.header를 통해 token 전송
	public void setAccessTokenInHeader(HttpServletResponse response, String accessToken) {
		response.setHeader(accessHeader, accessToken);
	}
	
	public void setRefreshTokenInHeader(HttpServletResponse response, String refreshToken) {
		response.setHeader(refreshHeader, refreshToken);		
		
	}
	
	//request.header를 통해 전달받은 토큰 추출
	public Optional<String> extractAccessToken(HttpServletRequest request){
		
		return Optional.ofNullable(request.getHeader(accessHeader))
				.filter(accessToken -> accessToken.startsWith(PREFIX))
				.map(accessToken -> accessToken.replace(PREFIX, BLANK));
		
		
	}
	
	public Optional<String> extractRefreshToken(HttpServletRequest request){
		
		return Optional.ofNullable(request.getHeader(refreshHeader))
				.filter(refreshToken -> refreshToken.startsWith(PREFIX))
				.map(refreshToken -> refreshToken.replace(PREFIX, BLANK));
		
	}
	
	//token에 포함된 값 확인
	public String extractUserInfo(String token) {
		
		
		
	    return JWT.require(Algorithm.HMAC512(secret))
		.build()
		.verify(token.replace(PREFIX, BLANK))
		.getClaim("t_username").asString();
	
		
		
		
	}
		
		//token 유효성 검사
		public boolean isTokenVaild(String token) {
			
			
			try {
				JWT.require(Algorithm.HMAC512(secret))
				.build()
				.verify(token);
				return true;
			}catch( JWTVerificationException e){
				
				e.getMessage();
				
				return false;
			}	
			
			
				
				
			
			
		}
				
//				.getClaim("t_id")
//				.getClaim("t_username")
//				.getClaim("t_role")
//				.asString();
				
	
	
	
	
	public TokenMapping createToken(User user) {
		

		return TokenMapping.builder().accessToken(createAccessToken(user))
				.refreshToken(createRefreshToken())
				.build();
		
	
		
				
		
	}
	
}
