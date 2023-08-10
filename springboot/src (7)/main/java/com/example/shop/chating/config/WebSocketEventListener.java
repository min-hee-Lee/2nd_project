package com.example.shop.chating.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.shop.chating.dto.ChatDto;

import lombok.extern.slf4j.Slf4j;

// 웹 소켓 연결(#1)과 연결 해제(#2) 이벤트가 발생했을 때 동작을 정의
// 연결 시 동작은 ChatController에서 addUser 메서드를 통해서 구현하고 있어 별도로 추가 동작을 정의하지 않으며, 
// 연결 해제 시에는 세션에서 사용자 정보가 있는 경우 퇴장 메시지(토픽)를 발행
@Slf4j
@Component
public class WebSocketEventListener {

	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	// #1
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {
		log.info("Received a new web socket connection");
	}

	// #2
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		
		
		String username = (String) headerAccessor.getSessionAttributes().get("username");
		
		
		
		
		int roomId = (int) headerAccessor.getSessionAttributes().get("roomId");
		
		
		
		
		if (username != null) {
			log.info("User Disconnected : " + username);

			ChatDto chatMessage = new ChatDto();
			chatMessage.setType(ChatDto.MessageType.LEAVE);
			chatMessage.setSender(username);
			chatMessage.setMessage(username + "님이 퇴장하셨습니다.");
			messagingTemplate.convertAndSend("/sub/chat/room/"+roomId,chatMessage);
			//messagingTemplate.convertAndSend("/topic/chatting", chatMessage);
		}
	}
}
