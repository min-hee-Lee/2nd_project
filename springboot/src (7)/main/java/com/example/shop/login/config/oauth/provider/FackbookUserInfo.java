package com.example.shop.login.config.oauth.provider;

import java.util.Map;

public class FackbookUserInfo implements OAuth2UserInfo{

	private Map<String, Object> attributes; //oauth2User.getAttributes() 를 받을거임
	
	
	public FackbookUserInfo(Map<String, Object> attributes) {
		this.attributes=attributes;
	}
	
	@Override
	public String getProviderId() {
		
		return (String) attributes.get("id");
	}

	@Override
	public String getProvider() {
		
		return "facebook";
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
