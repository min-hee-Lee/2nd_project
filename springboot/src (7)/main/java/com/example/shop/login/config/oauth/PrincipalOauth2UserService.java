package com.example.shop.login.config.oauth;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.shop.login.config.auth.PrincipalDetails;
import com.example.shop.login.config.oauth.provider.FackbookUserInfo;
import com.example.shop.login.config.oauth.provider.GoogleUserInfo;
import com.example.shop.login.config.oauth.provider.KakaoUserInfo;
import com.example.shop.login.config.oauth.provider.NaverUserInfo;
import com.example.shop.login.config.oauth.provider.OAuth2UserInfo;
import com.example.shop.login.dao.TestDAO;
import com.example.shop.login.dto.User;


@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService{
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private TestDAO dao;
	
	
	//구글로 부터 받은 userRequest 데이터에 대한 후처리 되는 함수
	//함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		System.out.println("getClientRegistration : " + userRequest.getClientRegistration()); // registrationId로 어떤 OAuth로 로그인 했는지 확인가능.
		System.out.println("getAccessToken : " + userRequest.getAccessToken());
	
		OAuth2User oauth2User = super.loadUser(userRequest);
		
		// 구글로그인 버튼 클릭 -> 구글 로그인창 -> 로그인을 완효 -> code를 리턴(OAuth-Client라이브러리) -> AccessToken 요청
				// userRequest 정보 -> loadUser함수 호출 -> 구글로부터 회원프로필 받아준다.
				
		System.out.println("getAttributes : " +super.loadUser(userRequest).getAttributes());
				
		
		//회원가입을 강제로 진행해볼 예정
		
		OAuth2UserInfo oAuth2UserInfo = null;
		
		String	IdCheck = userRequest.getClientRegistration().getRegistrationId();
		
		
		
		if(IdCheck.equals("google")) {
			
			System.out.println("구글 로그인 요청");
			
			oAuth2UserInfo = new GoogleUserInfo(oauth2User.getAttributes());
			
			
		}else if(IdCheck.equals("facebook")) {
			
			System.out.println("페이스북 로그인 요청");
			
			oAuth2UserInfo = new FackbookUserInfo(oauth2User.getAttributes());
			
		}else if(IdCheck.equals("naver")) {
			
			System.out.println("네이버 로그인 요청");
			
			oAuth2UserInfo = new NaverUserInfo((Map)oauth2User.getAttributes().get("response"));
			
		}else if(IdCheck.equals("kakao")) {
			
			System.out.println("카카오 로그인 요청");
			
			oAuth2UserInfo = new KakaoUserInfo(oauth2User.getAttributes());
			
		}else {
			System.out.println("구글과 페이스북만 요청");
		}
		
		
		
		
		
		
		String provider = oAuth2UserInfo.getProvider();
		
		String providerId = oAuth2UserInfo.getProviderId();
		String username = provider + "_" + providerId; //google_123141 ~~~ 이렇게 하면 충돌날 일이없을거임
		String password = bCryptPasswordEncoder.encode("안녕하세");
		String email = oAuth2UserInfo.getEmail();
		String role = "ROLE_USER";
		
		User userEntity = dao.SelectByMember(username);
		
		if(userEntity == null) {
			
			userEntity = User.builder()
					.t_username(username)
					.t_password(password)
					.t_email(email)
					.t_role(role)
					.provider(providerId)
					.providerId(providerId)
					.t_phone("000-0000-0000")
					.t_address(providerId)
					.t_createDate(String.valueOf(new Date()))
					.build();
			
			dao.insertMember(userEntity);
		}else {
			System.out.println("이미 등록된 회원입니다.");
		}
		
		
		
		//세션정보로 들어감
		return new PrincipalDetails(userEntity,oauth2User.getAttributes());
	}

	
	
}
