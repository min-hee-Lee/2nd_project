package com.example.shop.login.config.oauth.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{

	private Map<String, Object> attributes; //oauth2User.getAttributes() 를 받을거임
	
	//{id=2751420644, connected_at=2023-04-16T11:28:30Z, properties={nickname=오대성}, kakao_account={profile_nickname_needs_agreement=false, profile={nickname=오대성}, has_email=true, email_needs_agreement=false, is_email_valid=true, is_email_verified=true, email=eotjd85555@naver.com}}
	public KakaoUserInfo(Map<String, Object> attributes) {
		this.attributes=attributes;
	}
	
	@Override
	public String getProviderId() {
		
		
		
		return String.valueOf(attributes.get("id"));
	}

	@Override
	public String getProvider() {
		
		return "Kakao";
	}

	@Override
	public String getEmail() {
		
		
		Map map = (Map)attributes.get("kakao_account");
		
		
		
		return (String)map.get("email");
	}

	@Override
	public String getName() {
		
		Map map = (Map)attributes.get("properties");
		
		
		return (String)map.get("nickname");
	}

}
