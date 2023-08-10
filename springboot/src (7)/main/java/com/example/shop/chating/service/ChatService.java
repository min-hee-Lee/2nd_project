package com.example.shop.chating.service;

import java.util.List;

import com.example.shop.chating.dto.ChatDto;
import com.example.shop.chating.dto.Chat_main_imagesDTO;

public interface ChatService {
	List<ChatDto> selectMessages(int roomId) throws Exception;
	void insertMessage(ChatDto chatDto) throws Exception;
	public List<ChatDto> selectChatRoom();
	
	public void insertChatRoom(ChatDto chatDto);
	
	public List<Chat_main_imagesDTO> Chat_main_list(String filename);
	
	
}
