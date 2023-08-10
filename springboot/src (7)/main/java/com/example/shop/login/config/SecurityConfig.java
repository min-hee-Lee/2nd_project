package com.example.shop.login.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

import com.example.shop.login.Handler.OAuth2AuthenticationSuccessHandler;
import com.example.shop.login.config.AuthenticationFilter.JwtAuthenticationFilter;
import com.example.shop.login.config.AuthenticationFilter.JwtAuthorizationFilter;
import com.example.shop.login.config.AuthenticationFilter.service.JwtService;
import com.example.shop.login.config.oauth.PrincipalOauth2UserService;
import com.example.shop.login.dao.TestDAO;




// 1. 코드받기(인증), 2. 엑세스토큰(권한),
// 3. 사용자프로필 정보를 가져오고 4-1, 그 정보를 토대로 회원가입을 자동으로 진행시키기도 함
// 4-2 (이메일, 전화번호, 이름, 아이디) 쇼핑몰 -> (집주소), 백화점몰 -> (vip 등급, 일반등급)


@Configuration
@EnableWebSecurity  //스프링 시큐리티 필터 
//(밑에 클래스를 말하는거임 내가만든거 SecurityConfig)
// 가 스프링 필터체인에 등록이 된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
// secured 어노테이션 활성화, preAuthoize (전), postAuthoize(후), 어노테이션 활성화
public class SecurityConfig {
	
	
	@Autowired
	private PrincipalOauth2UserService principalOauth2UserService;
	
	//@Autowired
	//private  CorsFilter corsFilter;
	
	@Autowired
	private CorsConfig corsConfig;
	
	@Autowired
	private TestDAO dao;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		//jwt 를 이용해서 로그인 처리 할꺼임 인증, 인가 방식
		//csrf(): Cross Site Request Forgery로 사이트간 위조 요청으로 정상적인 사용자가 의도치 않은
		//위조 요청을 보내는 것을 의미한다.
		
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.formLogin().disable();
		//http.apply(new MyCustomerFilter());
		
		
		//http.cors();
		
		
		http
		.apply(new MyCustomerFilter())
		//.formLogin()
		//.loginPage("/loginForm") //권한이 없는 사람 로그인 페이지로 이동
		//.usernameParameter("t_username")
		//.passwordParameter("t_password")
		//.loginProcessingUrl("/login") // login 주소가 호출이 되면 시큐리티가 낚아채서 대신 로그인 진행
		//.defaultSuccessUrl("/") //로그인이 끝나면, 로그인 폼에서 왔으면 / 주지만 필터에 의해서 니가 로그인 페이지로 왔다면, 로그인 성공시 그 페이지로 다시 가게해줄게
		//.and()
		.and()
		.oauth2Login()
		.loginPage("/loginForm")  // 구글 로그인이 완료된 뒤에 후처리가 필요함. 구글은 Tip. 코드X (엑세스토큰 + 사용자프로필정보 O)
		.userInfoEndpoint()
		.userService(principalOauth2UserService)  //여기서 후처리 // 구글 로그인이 완료된 뒤에 후처리가 필요함. 구글은 Tip. 코드X (엑세스토큰 + 사용자프로필정보 O)
		.and()
		.successHandler(oAuth2AuthenticationSuccessHandler);
		
		http.authorizeHttpRequests()
//		.antMatchers("/user/**").authenticated() // 로그인 인증되어야함(인증만 되면 들어갈수 있는 주소 )
//		.antMatchers("/manager/**").hasRole("hasRole(\"ROLE_ADMIN or ROLE_MANAGER\")")
//		.antMatchers("/admin/**").hasRole("hasRole(\"ROLE_ADMIN\")")//access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
		.anyRequest().permitAll();//나머진 통과
		
		return http.build();
	}
	
	
	public class MyCustomerFilter extends AbstractHttpConfigurer<MyCustomerFilter, HttpSecurity>{

		@Override
		public void configure(HttpSecurity http) throws Exception {
		
			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
			
			System.out.println("authenticationManager"+authenticationManager);
			//http.addFilter(corsFilter);
			
			http.addFilter(corsConfig.corsFileter());
			
			//addFilter() : FilterComparator에 등록되어 있는 Filter 들을 활성화 할떄 사용
			//addFilterBefore(), addFilterAfter() ; customFilter를 등록 할때 사용
			//인증 필터 등록
			http.addFilter(new JwtAuthenticationFilter(authenticationManager,jwtService));
			http.addFilter(new JwtAuthorizationFilter(authenticationManager, dao));
			//인가(권한) 필터 등록
		
			
			
		}
		
		
		
	}
	

	
}
