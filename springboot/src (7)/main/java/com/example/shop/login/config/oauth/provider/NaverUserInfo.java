package com.example.shop.login.config.oauth.provider;

import java.util.Map;

public class NaverUserInfo implements OAuth2UserInfo{

	private Map<String, Object> attributes; //oauth2User.getAttributes() 를 받을거임
	
	//response={id=_F8b4i2rdwgAk3zuEONPlThgQ-8SjDT_e_Uk6523ffg, email=eotjd85555@naver.com, name=오대성}}
	public NaverUserInfo(Map<String, Object> attributes) {
		this.attributes=attributes;
	}
	
	@Override
	public String getProviderId() {
		
		return (String) attributes.get("id");
	}

	@Override
	public String getProvider() {
		
		return "naver";
	}

	@Override
	public String getEmail() {
		
		return (String) attributes.get("email");
	}

	@Override
	public String getName() {
		
		return (String) attributes.get("name");
	}

}
