package com.example.shop.chating.dto;


import java.util.List;

import lombok.Data;

@Data
public class ChatDto {
	
	private Integer roomId;
	private String roomName;
	private MessageType type;
	private String message;
	private String sender;
	private String createdDt;
	private List<ChatDto> history;
	private String bigo;
	
	public enum MessageType {
		JOIN, CHAT, LEAVE, CHANGE_ROOM
	}
}