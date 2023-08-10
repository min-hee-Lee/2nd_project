package com.example.shop.login.config.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.example.shop.login.dto.User;



// 시큐리티가 /login 주소 요청이 오면 낚아채서 로그인을 진행시킨다.
// 로그인 진행이 완료가 되면 시큐리티 session을 만들어 준다. (Security ContextHolder)
// 오브젝트 타입 => Authentication 타입 객체
// Authentication 안에 User 정보가 있어야 됨.
// User오브젝트 타입 => UserDetails 타입 객체

// Security Session -> Authentication -> UserDetails(PrincipalDetails)


/*
 * 	스프링 시큐리티는 스프링 시큐리티 세션을 들고 있다.
그러면 원래 서버 세션 영역 안에 시큐리티가 관리하는 세션이 따로 존재하게 된다.

시큐리티 세션에는 무조건 Authentication 객체 만 들어갈 수 있다.
Authentication가 시큐리티세션 안에 들어가 있다는 것은 로그인된 상태라는 의미이다.
Authentication에는 2개의 타입이 들어갈 수 있는데 UserDetails, OAuth2User이다.

  문제점 : 
  이때 세션이 2개의 타입으로 나눠졌기 때문에 컨트롤러에서 처리하기 복잡해진다는 문제점이 발생한다!
  왜냐하면 일반적인 로그인을 할 때엔 UserDetails 타입으로 Authentication 객체가 만들어지고,
  구글 로그인처럼 OAuth 로그인을 할 때엔 OAuth2User 타입으로 Authentication 객체가 만들어지기 때문이다.

  해결방법 : 
  PrincipalDetails에 UserDetails, OAuth2User를 implements한다.
  우리는 오직 PrincipalDetails 만 활용하면 된다.
 * */

public class PrincipalDetails implements UserDetails, OAuth2User{
	
	
	private User user; //콤포지션
	private Map<String, Object> attributes;
	
	
	//일반 로그인
	public PrincipalDetails(User user) {
		this.user=user;
	}
	
	//OAuth 로그인
	public PrincipalDetails(User user,Map<String, Object> attributes) {
		this.user=user;
		this.attributes =attributes;
	}
	
	
	
	

	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}



	// 해당 User의 권한을 리턴하는 곳!
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Collection<GrantedAuthority> collect = new ArrayList<>();
		
		collect.add(()->{return user.getT_role();});
		
		return collect;
	}

	@Override
	public String getPassword() {
		
		return user.getT_password();
	}

	@Override
	public String getUsername() {
		return user.getT_username();
	}
	
	//계정만료 여부 리턴 - true(만료안됨)
		@Override
		public boolean isAccountNonExpired() {
			return true;
		}
		
		//계정의 잠김여부 리턴 - true(잠기지 않음)
		@Override
		public boolean isAccountNonLocked() {
			return true;
		}
		
		//비밀번호의 잠김여부 리턴 - true(잠기지 않음)
		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}
		
		//계정의 활성화 여부 리턴 - true (활설화 됨)
		@Override
		public boolean isEnabled() {
				
			//false 예시
			//우리 사이트 1년동안 회원이 로그인을 안하면 휴면 계정으로 하기로 함
			//현재 시간 - 로그인 시간 -> 1년을 초과하면 return false;
			
			return true;
		}



		@Override
		public Map<String, Object> getAttributes() {
			
			return attributes;
		}

		
		//이건 잘안씀 
		@Override
		public String getName() {
			return (String) attributes.get("sub");
		}

}
