//package com.example.shop.chating.controller;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.example.shop.chating.dto.ChatDto;
//import com.example.shop.chating.dto.ChatDto.MessageType;
//import com.example.shop.chating.service.ChatService;
//
///*
// * 메시지 처리 방법을 정의
// * 한 클라이언트로 부터 수신한 메시지를 같은 토픽을 구독하고 있는 클라이언트에게 브로드캐스팅
// * @MessageMapping 어노테이션으로 메시지를 처리할 메서드를 지정하고, @SendTo 어노테이션으로 발행할 토픽을 지정
// */
//@Controller
//public class ChatController {
//	
//	@Autowired
//	ChatService service;
//	
//	//@Autowired
//	//private SimpMessagingTemplate template;  //특정 Broker 로 메세지 전달
//
//	// 사용자 등록 처리
//	// 세션에 사용자 이름을 저장(#1)하고 입장 메시지(#2)와 이전 대화 내용(#3)을 추가해서 토픽을 발행(#4)
//	// 세션에 저장한 사용자 이름은 WebSocketEventListener에서 연결이 끊어졌을 때 사용자를 식별하기 위한 용도로 사용
//	@MessageMapping("/chat.addUser")
//	@SendTo("/topic/chatting") /* #4 */
//	public ChatDto addUser(@Payload ChatDto chatDto, SimpMessageHeaderAccessor headerAccessor) throws Exception {
//		
//		System.out.println("ChatDto 컨트롤러 호출 : "+ chatDto);
//		
//		System.out.println("addUser chatDto : "+chatDto);
//		
//		
//		
//		
//		headerAccessor.getSessionAttributes().put("username", chatDto.getSender()); /* #1 */
//
//		chatDto.setMessage(chatDto.getSender() + "님이 입장하셨습니다."); /* #2 */
//		
//		List<ChatDto> list = service.selectMessages(chatDto.getRoomId()); /* #3 */
//		
//		
//		
//		chatDto.setHistory(list);
//		
//		
//		
//		System.out.println("ChatDto 컨트롤러 호출 : "+ chatDto);
//		return chatDto;
//	}
//
//	// 채팅 메시지 전달 처리
//	// 채팅 메시지를 DB에 저장(#5)하고 토픽을 발행(#6)
//	@MessageMapping("/chat.sendMessage")
//	@SendTo("/topic/chatting") /* #6 */
//	public ChatDto sendMessage(@Payload ChatDto chatDto) throws Exception {
//		service.insertMessage(chatDto); /* #5 */
//		return chatDto;
//	}
//	
//	@MessageMapping("/chat.selectRoom")
//	@SendTo("/topic/chatting")
//	public ChatDto selectRoom(@Payload ChatDto chatDto, SimpMessageHeaderAccessor headerAccessor) throws Exception{
//		
//		
//		
//		headerAccessor.getSessionAttributes().put("roomId", chatDto.getRoomId()); //#1
//		
//		List<ChatDto> list = service.selectMessages(chatDto.getRoomId());
//		
//		chatDto.setHistory(list);
//		chatDto.setType(MessageType.CHANGE_ROOM);
//		
//		return chatDto;
//		
//	}
//	
//	@ResponseBody
//	@GetMapping("user/chatList")
//	public Map<String, Object> roomList() {
//		
//		Map<String, Object> map = new HashMap<>();
//		
//		
//		//System.out.println(service.selectChatRoom());
//		
//		map.put("chatRoomList", service.selectChatRoom());
//		
//		
//		
//		return map;
//	}
//	
//	
//	@ResponseBody
//	@PostMapping("user/chatList")
//	public void roomCreate(ChatDto dto) {
//		
//		service.insertChatRoom(dto);
//		
//	}
//}