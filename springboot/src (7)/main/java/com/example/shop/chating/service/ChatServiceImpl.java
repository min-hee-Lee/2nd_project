package com.example.shop.chating.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop.chating.dao.ChatMapper;
import com.example.shop.chating.dto.ChatDto;
import com.example.shop.chating.dto.Chat_main_imagesDTO;

@Service
public class ChatServiceImpl implements ChatService {
	@Autowired
	ChatMapper mapper;
	
    // 한번에 가져올 이전 대화의 개수
    //private final int CONST_MAX_MESSAGE_COUNT = 10;
	
	@Override
	public List<ChatDto> selectMessages(int roomId) throws Exception {
		return mapper.selectMessages(roomId);
	}

	@Override
	public void insertMessage(ChatDto chatDto) throws Exception {
        // 현재 시간을 설정해서 대화 내용을 저장
		LocalDateTime now = LocalDateTime.now();
		chatDto.setCreatedDt(now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
		mapper.insertMessage(chatDto);
	}

	@Override
	public List<ChatDto> selectChatRoom() {
		
		return mapper.selectChatRoom();
	}

	@Override
	public void insertChatRoom(ChatDto chatDto) {
		
		mapper.insertChatRoom(chatDto);
		
	}

	@Override
	public List<Chat_main_imagesDTO> Chat_main_list(String filename) {
		
		return mapper.Chat_main_list(filename);
	}


}
