package com.example.shop.payments.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import com.example.shop.payments.dto.BookingDTO;
import com.example.shop.payments.dto.Booking_Time_CheckDTO;
import com.example.shop.payments.dto.KakaoApproveResponse;
import com.example.shop.payments.dto.KakaoPay_KeyDTO;
import com.example.shop.payments.dto.KakaoReadyResponse;
import com.example.shop.payments.dto.PaymentsCancelResponseDTO;
import com.example.shop.payments.dto.Payments_KeyDTO;
import com.example.shop.payments.dto.TestDTO;
import com.example.shop.payments.dto.Toss_PaymentsDTO;
import com.example.shop.payments.service.PayService;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.minidev.json.JSONObject;
import oracle.jdbc.proxy.annotation.Post;


@CrossOrigin("*")
@RestController

public class PayMentsController {
	
	@Autowired
	private PayService service;
	
	private ConcurrentHashMap<String, String> conMap = new ConcurrentHashMap<>();
	
	private KakaoReadyResponse kakaoReadyResponse;
	
	
	
	@PostMapping("/payments/success")
	public String payments(
			@RequestParam("paymentKey") String paymentKey,
			@RequestParam("amount") long amount,
			@RequestParam("orderId") String orderId
			){
		
		
		
		
		System.out.printf("paymentKey : %s , amount : %d, orderId : %s", paymentKey,amount,orderId);
		
		String url = "https://api.tosspayments.com/v1/payments/confirm";
		
		HttpHeaders headers = new HttpHeaders();
		
		String auth = "Authorization: Basic " + "test_sk_YZ1aOwX7K8mbK5Maq7W3yQxzvNPG";
		
		String key = "test_sk_YZ1aOwX7K8mbK5Maq7W3yQxzvNPG" + ":";
		//String encodedAuth
		
		//headers.set("Authorization", auth);
		
		String encodedAuth = new String(Base64.getEncoder().encode(key.getBytes(StandardCharsets.UTF_8)));
		
				
		
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		headers.setBasicAuth(encodedAuth);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		
		
		//headers.set("Content-Type", "application/json");
		
		//--data '{"paymentKey":"ijaJ6LscuKZZFN_IEyvYD","amount":15000,"orderId":"sqOg3qcwe9mAsfToLko3z"}'
		
//		MultiValueMap<String, Object> param = new LinkedMultiValueMap<>();
//		
//		param.add("paymentKey",paymentKey);
//		param.add("amount",amount);
//		param.add("orderId",orderId);
		
		JSONObject param = new JSONObject();
		param.put("paymentKey", paymentKey);
		param.put("amount", amount);
		param.put("orderId", orderId);
		

		
		
		RestTemplate restTemplate = new RestTemplate();
		
		HttpEntity<Map<String, Object>> requestEntity =
				new HttpEntity<>(param,headers);
		Toss_PaymentsDTO toss_PaymentsDTO =
		restTemplate.postForObject(url, requestEntity, Toss_PaymentsDTO.class);
		
		if(toss_PaymentsDTO == null) {
			
			return "fail";
		}
		
		
		System.out.println(toss_PaymentsDTO);
										//`${t_id}_${main_code}_${start_time}_${end_time}_${cost}_${use_date}
		toss_PaymentsDTO.getOrderId();  // orderId : 1_1_3_4_80000_23-05-25
		toss_PaymentsDTO.getPaymentKey(); //취소시 키 필요 1kZn04DxKBE92LAa5PVbNldbxWXOPzV7YmpXyJjg6Owzoeqd
		toss_PaymentsDTO.getOrderName(); //토모짐(TOMO GYM)
		toss_PaymentsDTO.getMethod(); //method=간편결제)
		toss_PaymentsDTO.getEasyPay().getProvider(); // provider = 토스페이
		
		String[] data = toss_PaymentsDTO.getOrderId().split("_");
		
		String t_id =data[0];
		String main_code =data[1];
		String start_time =data[2];
		String end_time =data[3];
		String cost =data[4];
		String use_date =data[5];
		
		String type = toss_PaymentsDTO.getMethod();
		String provider = toss_PaymentsDTO.getEasyPay().getProvider();
		String booking_state = "1";
		
		BookingDTO bookingDTO = new BookingDTO();
		
		bookingDTO.setT_id(Integer.parseInt(t_id));
		bookingDTO.setMain_code(Integer.parseInt(main_code));
		bookingDTO.setStart_time(data[2]);
		bookingDTO.setEnd_time(data[3]);
		bookingDTO.setCost(Integer.parseInt(data[4]));
		bookingDTO.setUse_date(use_date);
		bookingDTO.setType(type);
		bookingDTO.setProvider(provider);
		bookingDTO.setBooking_state("1");
		
		
		Payments_KeyDTO payments_keyDTO = new Payments_KeyDTO();
		
		payments_keyDTO.setPayments_key(toss_PaymentsDTO.getPaymentKey());
		payments_keyDTO.setT_id(Integer.parseInt(t_id));
		
		service.Insert_tossPayments(bookingDTO,payments_keyDTO);
		
		
		
		
		
//		HttpEntity<MultiValueMap<String, String>> requestEntity =
//				 new HttpEntity<>(param, httpHeaders);
//		 
//		 KakaoApproveResponse approveResponse=
//		 restTemplate.postForObject(
//				 "https://kapi.kakao.com/v1/payment/approve"
//				 , requestEntity
//				 , KakaoApproveResponse.class);
		
		
				
		
		return "success";
	}
	
	@PostMapping("/payments/cancel")
	public ResponseEntity<?> tossPaymentsCancel(
			@RequestBody Payments_KeyDTO payments_KeyDTO
			){
		
		System.out.println(payments_KeyDTO);
		
		String payments_key =service.toss_payments_Cencle(payments_KeyDTO.getBooking_code());
		
		
		RestTemplate restTemplate = new RestTemplate();
		
		String url = "https://api.tosspayments.com/v1/payments/" +payments_key + "/cancel";
		String key = "test_sk_YZ1aOwX7K8mbK5Maq7W3yQxzvNPG" + ":";
		
		
		HttpHeaders headers = new HttpHeaders();
		byte[] secretKeyByte = key.getBytes(StandardCharsets.UTF_8);
		
		headers.setBasicAuth(new String(Base64.getEncoder().encode(secretKeyByte)));
		
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		
		JSONObject param = new JSONObject();
		// --data '{"cancelReason":"고객이 취소를 원함"}'
		param.put("cancelReason", "고객이 취소를 원함");
		//리턴받아야됌
		PaymentsCancelResponseDTO responseDTO =
				restTemplate.postForObject(
						url, 
						new HttpEntity<>(param,headers), 
						PaymentsCancelResponseDTO.class);
		
		//성공시 booking 상태 바꾸기
		service.bookingCancel(payments_KeyDTO.getBooking_code());
		
		return ResponseEntity.ok("결제취소가 완료되었습니다.");
	}
	
	
	
	
	////////////////////////////////////////////////////////////////////////////////
	
	@PostMapping("/pay/kakaopay")
	public KakaoReadyResponse kakaoPay(@RequestBody BookingDTO bookingDTO) {
		
		System.out.println(bookingDTO);
//		
//		
		String bookingDTO_info = bookingDTO.getT_id()+"@"	
							   + bookingDTO.getMain_code() + "@"
							   + bookingDTO.getUse_date() + "@"
							   + bookingDTO.getCost() + "@"
							   + bookingDTO.getStart_time() + "@"
							   + bookingDTO.getEnd_time() + "@"
							   + bookingDTO.getMain_name() + "@";
							    
		
		
		
				long payments = bookingDTO.getCost();
		
		String name = bookingDTO.getMain_name();
		
		try {
			name = URLEncoder.encode(bookingDTO.getMain_name(),"UTF-8");
			
			bookingDTO_info = URLEncoder.encode(bookingDTO_info,"UTF-8");
			
			
			
		} catch (UnsupportedEncodingException e) {
			
			e.printStackTrace();
		}
		
		ObjectMapper parse = new ObjectMapper();
		
		try {
			URL address = new URL("https://kapi.kakao.com/v1/payment/ready");
			
			try {
				HttpURLConnection con = (HttpURLConnection) address.openConnection();
				con.setRequestMethod("POST");
				con.setRequestProperty("Authorization", "KakaoAK dae56277e5f51d81b6f0c18eca0ff47e");
				con.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
				con.setDoOutput(true);
				
				String param = "cid=TC0ONETIME&partner_order_id=partner_order_id"
						+ "&partner_user_id=partner_user_id&item_name="+name
						+ "&item_code="+bookingDTO_info
						+ "&quantity=1&total_amount="+ payments +"&vat_amount=200&tax_free_amount=0"
						+ "&approval_url=http://localhost:8090/kakaoPay/success"
						+ "&cancel_url=http://localhost:8090/"
						+ "&fail_url=http://localhost:8090/";
				
				OutputStream os = con.getOutputStream();
				
				DataOutputStream dos = new DataOutputStream(os);
				
				dos.writeBytes(param);
				
				//dos.flush();
				dos.close();
				
				int result = con.getResponseCode();
				
				InputStream is;
				
				if(result ==200) {
					is = con.getInputStream();
				}else {
					is = con.getErrorStream();
					}
				
				InputStreamReader reader = new InputStreamReader(is);
				BufferedReader brd = new BufferedReader(reader);
				
				//바꿀꺼임
				
				
				
				
				
				
				
				kakaoReadyResponse 
				= parse.readValue(brd.readLine(), KakaoReadyResponse.class);
				
				
				
				System.out.println("kakaoReadyResponse" + kakaoReadyResponse);
				
				
				return kakaoReadyResponse;
				
				
				
				
			} catch (IOException e) {
				
				e.printStackTrace();
			}
			
			
			
		
		} catch (MalformedURLException e) {
			
			e.printStackTrace();
		}
		
		
		return new KakaoReadyResponse();
	}
	
	@GetMapping("/kakaoPay/success")
	public void kakaoPaySuccess(@RequestParam("pg_token") String pgToken
			, HttpServletResponse response
			) {
		
		System.out.println(pgToken);
		
		MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
		
		param.add("cid", "TC0ONETIME");
		param.add("tid", kakaoReadyResponse.getTid());
		param.add("partner_order_id", "partner_order_id");
		param.add("partner_user_id", "partner_user_id");
		param.add("pg_token", pgToken);	
		
		HttpHeaders httpHeaders = new HttpHeaders();
		
		 String auth = "KakaoAK " + "dae56277e5f51d81b6f0c18eca0ff47e";
		 
		 httpHeaders.set("Authorization", auth);
		 httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		 RestTemplate restTemplate = new RestTemplate();
		 
		 HttpEntity<MultiValueMap<String, String>> requestEntity =
				 new HttpEntity<>(param, httpHeaders);
		 
		 KakaoApproveResponse approveResoponse=
		 restTemplate.postForObject(
				 "https://kapi.kakao.com/v1/payment/approve"
				 , requestEntity
				 , KakaoApproveResponse.class);
		 
		 System.out.println(approveResoponse);
		 
		 
		 String [] data = approveResoponse.getItem_code().split("@");
		 
		 //DB 저장 로직 캔슬이랑 저장이랑 둘다 해야됌
		 
		 System.out.println("Total : " + approveResoponse.getAmount().getTotal());
		 System.out.println(String.valueOf("Tax_free : " + approveResoponse.getAmount().getTax_free()));
		 System.out.println("Tax : " + approveResoponse.getAmount().getTax());
		
		 
		 
		  KakaoPay_KeyDTO kakaoPay_KeyDTO = new KakaoPay_KeyDTO();
		  kakaoPay_KeyDTO.setCancel_amount(String.valueOf(approveResoponse.getAmount().getTotal()));
		  kakaoPay_KeyDTO.setCancel_tax_free_amount(String.valueOf(approveResoponse.getAmount().getTax_free()));
		  kakaoPay_KeyDTO.setCancel_vat_amount(String.valueOf(approveResoponse.getAmount().getTax()));
		  kakaoPay_KeyDTO.setTid(String.valueOf(approveResoponse.getTid()));
		  kakaoPay_KeyDTO.setCid(approveResoponse.getCid());
		       
	       BookingDTO bookingDTO = new BookingDTO();
	       
	       
	       
	       String bookingDTO_info = bookingDTO.getT_id()+"@"	
				   + bookingDTO.getMain_code() + "@"
				   + bookingDTO.getUse_date() + "@"
				   + bookingDTO.getCost() + "@"
				   + bookingDTO.getStart_time() + "@"
				   + bookingDTO.getEnd_time() + "@"
				   + bookingDTO.getMain_name() + "@";
	       String t_id = data[0];
	       String main_code = data[1];
	       String use_date = data[2];
	       String cost = data[3];
	       String start_time = data[4];
	       String end_time = data[5];
	       String main_name = data[6];
	       
	       
	       bookingDTO.setT_id(Integer.parseInt(t_id));
	       bookingDTO.setMain_code(Integer.parseInt(main_code));
	       bookingDTO.setUse_date(use_date);
	       bookingDTO.setCost(Integer.parseInt(cost));
	       bookingDTO.setStart_time(start_time);
	       bookingDTO.setEnd_time(end_time);
	       //bookingDTO.setMain_name(main_name);
	       bookingDTO.setBooking_state("1");
	       bookingDTO.setProvider("kakaoPay");
	       //bookingDTO.setType(approveResoponse.getCard_info().getCard_type());
	       bookingDTO.setType("카카오페이");
	       
	       service.Insert_kakaopay(bookingDTO, kakaoPay_KeyDTO);
	       
	       //service.KakaoPayCancelProcess(KakaoPayCancelDTO, bookingDTO);
		 
		 
		try {
			response.sendRedirect("http://localhost:3000");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
	}
	
	@PostMapping("/kakaoPay/refund")
	public ResponseEntity<?> refund(@RequestBody Payments_KeyDTO payments_KeyDTO
			, HttpServletResponse response) {
		
		//System.out.println(payments_KeyDTO);
		
		KakaoPay_KeyDTO kakaoPay_KeyDTO =service.kakaoPay_Cencle(payments_KeyDTO.getBooking_code());
		
		//System.out.println(kakaoPay_KeyDTO);
		
		MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
		
		param.add("cid", kakaoPay_KeyDTO.getCid());
		param.add("tid", kakaoPay_KeyDTO.getTid());
		param.add("cancel_amount", kakaoPay_KeyDTO.getCancel_amount());
		param.add("cancel_tax_free_amount", kakaoPay_KeyDTO.getCancel_tax_free_amount());
		param.add("cancel_vat_amount", kakaoPay_KeyDTO.getCancel_vat_amount());
		
		HttpHeaders httpHeaders = new HttpHeaders();
		
		 String auth = "KakaoAK " + "dae56277e5f51d81b6f0c18eca0ff47e";

         httpHeaders.set("Authorization", auth);
         httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		 
         RestTemplate restTemplate = new RestTemplate();

		 
		 HttpEntity<MultiValueMap<String, String>> requestEntity =
				 new HttpEntity<>(param,httpHeaders);
		 
		 //System.out.println("param" + param);
		 //System.out.println(requestEntity);
		
		 KakaoApproveResponse approveResoponse =
		 restTemplate.postForObject(
				 "https://kapi.kakao.com/v1/payment/cancel"
				 , requestEntity
				 , KakaoApproveResponse.class);
		 
//		 KakaoApproveResponse approveResoponse 
//	        = restTemplate.postForObject(
//	        		 "https://kapi.kakao.com/v1/payment/cancel"
//	        		, requestEntity
//	        		, KakaoApproveResponse.class);
		 
		 service.bookingCancel(payments_KeyDTO.getBooking_code());
		 
//		try {
//			response.sendRedirect("http://localhost:3000");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}	
		 
		 return ResponseEntity.ok("결제취소가 완료되었습니다.");
		
	}
	
	
	
	@GetMapping("/bookingTimeCheck")
	public Map<String, Object> bookingTimeCheck(
			@RequestParam("main_code") int main_code,
			@RequestParam("use_date") String use_date
			){
		
		System.out.println(main_code);
		System.out.println(use_date);
		
		Map<String, Object> map = new HashMap<>();
		
		Booking_Time_CheckDTO checkDTO = new Booking_Time_CheckDTO();
		
		checkDTO.setMain_code(main_code);
		checkDTO.setUse_date(use_date);		
		
		System.out.println(service.booking_Time_Check(checkDTO));
		
		List<Booking_Time_CheckDTO> checkList = service.booking_Time_Check(checkDTO);
		
		List<Integer> totalList = new ArrayList<>();
		
		if(checkList==null) {
			return map;
		}
		
		for(int i=0; i<checkList.size(); i++) {
			
			int start = Integer.parseInt(checkList.get(i).getStart_time());
			int end = Integer.parseInt(checkList.get(i).getEnd_time());
			
		
			
			for(int j=0; j<(end-start); j++) {
				
				totalList.add(start+j);
				
			}
			
			Collections.sort(totalList);
			
			
			System.out.println(totalList);
			
//			totalList.add(checkList.get(i).getStart_time());
//			totalList.add(checkList.get(i).getEnd_time());
			
		}
		
		
		map.put("TimeTotalList", totalList);
		
		return map;
		
	}
	
	
}
















