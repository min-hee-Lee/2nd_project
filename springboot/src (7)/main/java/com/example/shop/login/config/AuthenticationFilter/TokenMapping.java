package com.example.shop.login.config.AuthenticationFilter;

import java.util.HashMap;
import java.util.Map;



import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenMapping {

	private final String accessToken;
	private final String refreshToken;

	@Builder
	public TokenMapping(String accessToken, String refreshToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}
	
	

	
}
