package com.example.shop.login.config.AuthenticationFilter;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.shop.login.config.AuthenticationFilter.service.JwtService;
import com.example.shop.login.config.auth.PrincipalDetails;
import com.example.shop.login.dto.User;
import com.fasterxml.jackson.databind.ObjectMapper;

//Authentication (인증)  Authentization (인가)

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private AuthenticationManager authManager;
	
	
	
	private JwtService jwtService;
	
	public JwtAuthenticationFilter(AuthenticationManager authManager, JwtService jwtService) {
		this.jwtService = jwtService;
		this.authManager = authManager;
	}
	
	// http://localhost:8090/login 요청을 하면 실행되는 함수
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		try {
			ObjectMapper om = new ObjectMapper();
			//request에 있는 비밀번호와 아이디 읽어와서 User.class에 저장
			User user = om.readValue(request.getInputStream(), User.class);
			
			System.out.printf("JwtAuthenticationFilter =  t_username : %s, t_password: %s\n", user.getT_username(), user.getT_password());
			
			
			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(user.getT_username(),user.getT_password());
			
			System.out.println("authenticationToken"+authenticationToken);
			
			Authentication authentication = authManager.authenticate(authenticationToken);
			
			System.out.println("authentication : " + authentication);
			
			
			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
			System.out.printf("로그인 완료됨(인증) : %s %s\n",principalDetails.getUsername(), principalDetails.getPassword());
			
			
			return authentication;
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("successFul");
		
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		
		System.out.println();
		System.out.println("jwtService 수행");
		User user = principalDetails.getUser();
		String jwtToken=jwtService.createAccessToken(user);
		
		
//		String jwtToken = JWT.create()
//		.withSubject("AccessToken")
//		.withExpiresAt(new Date(System.currentTimeMillis()+60*60*1L*3000))//9분
//		.withClaim("t_id", user.getT_id())
//		.withClaim("t_username", user.getT_username())
//		.withClaim("t_role",user.getT_role())
//		.sign(Algorithm.HMAC512("myCorsTest"));
		
		
		
		
		System.out.println(jwtToken);
		
		//response 응답헤더에 jwtToken 추가  위에 메서드에서 "Bearer " 붙혀서 나옴 
		response.addHeader("Authorization",jwtToken);
		
		
		final Map<String, Object> body = new HashMap<>();
		
		body.put("t_id", principalDetails.getUser().getT_id());
		body.put("t_username", principalDetails.getUser().getT_username());
		body.put("t_role", principalDetails.getUser().getT_role());
		
		ObjectMapper mapper = new ObjectMapper();
		
		//바디값 보냄
		mapper.writeValue(response.getOutputStream(), body);
		
		
		
		
	}


	
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		
		System.out.println("UnsuccessFul");
		
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("code", HttpStatus.UNAUTHORIZED.value());
		body.put("error", failed.getMessage());
		
		new ObjectMapper().writeValue(response.getOutputStream(), body);
		
		
	}
	
	
	
	
	
	
	
}
