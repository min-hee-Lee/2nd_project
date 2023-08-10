package com.example.shop.login.Handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.shop.login.config.AuthenticationFilter.TokenMapping;
import com.example.shop.login.config.AuthenticationFilter.service.JwtService;
import com.example.shop.login.config.auth.PrincipalDetails;
import com.example.shop.login.dao.TestDAO;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
	
	
	private static final String REDIRECT_URL = "http://localhost:3000/login/redirect";
	
	
	private final TestDAO dao;
	
	private final JwtService jwtService;
	
	
	
	@Transactional
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		TokenMapping tokenMapping = saveUser(authentication);
		
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		
		
		final Map<String, Object> map = new HashMap<>();
		
	
		
		map.put("t_id", principalDetails.getUser().getT_id());
		map.put("t_username", principalDetails.getUser().getT_username());
		map.put("t_role", principalDetails.getUser().getT_role());
		
		
		getRedirectStrategy().sendRedirect(request, response, getRedirectUrl(tokenMapping,map));
		
		
		
		
		
		
	}

	
	
	private TokenMapping saveUser(Authentication authentication) {
		
		
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		
		//토큰생성
		TokenMapping token = jwtService.createToken(principalDetails.getUser());
		
		
		
		
		
		return token;
		
	}
	
	
	private String getRedirectUrl(TokenMapping token,Map<String, Object> map) {
		
		return UriComponentsBuilder.fromUriString(REDIRECT_URL)
				.queryParam("token", token.getAccessToken())
				.queryParam("t_id", map.get("t_id"))
				.queryParam("t_username", map.get("t_username"))
				.queryParam("t_role", map.get("t_role"))
				.build().toString();
			

		
	}
	
	
	
}
