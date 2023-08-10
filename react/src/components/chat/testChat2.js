import { Stomp } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { boardActions } from "../../reduxs/actions/board_action";
import bc from "../../css/chat/Chatting2.module.css";
import TelegramIcon from "@material-ui/icons/Telegram";
import ChatList from "./chatList";

const TestChat2 = () => {
  const dispatch = useDispatch();

  // 채팅방 목록
  // const [chatRooms, setChatRooms] = useState([]);

  // const [roomInfo, setroomInfo] = useState({
  //   roomId: '',
  //   roomInfo: '',
  // });

  const [selectRowId, setSelectRowId] = useState(null);

  console.log(selectRowId);

  const chatRoomList = useSelector((state) => state.board.chatRoomList);

  const getChatRoomList = () => {
    dispatch(boardActions.getChatRoomList());
  };

  // isJoin       채팅 참가 여부
  //              초기값은 false이며 연결 후 JOIN 메시지를 수신했을 때 true로 설정합니다.

  const [isJoin, setIsJoin] = useState(false);

  // chatHistory  [ { type, sender, message }, { ... }, ... ] 형식의 채팅 내용을 저장하는 배열

  const [chatHistory, setChatHistory] = useState([]);
  //sender 사용자 이름
  const [sender, setSender] = useState("");
  //message 사용자가 작성한 채팅 내용
  const [message, setMessage] = useState("");

  // 채팅방 목록
  const [chatRooms, setChatRooms] = useState([]);

  // ref 변수 정의

  // refDialogDiv     채팅 내용 출력 영역을 자동 스크롤하기 위해서 사용합니다.
  const refDialogDiv = useRef();
  // refSenderInput   사용자 이름 입력 창에 포커스를 부여하기 위해서 사용합니다.
  const refSenderInput = useRef();
  // refMessageInput  채팅 내용 입력 창에 포커스를 부여하기 위해서 사용합니다.
  const refMessageInput = useRef();
  // stompClient      스톰프 클라이언트의 상태를 유지시키지 위해서 사용합니다.
  const stompClient = useRef(null);

  // 채팅 참여
  // -----------------------------------------------------------------------------------------
  // 닉네임을 입력하고 참가 버튼을 클릭했을 때 호출합니다.
  // 웹 소켓 객체와 스톰프 클라이언트 객체를 생성하고, 서버(connect)와 연결을 시도합니다.
  // 서버와 연결 시 연결에 성공한 경우(onConnected)와 실패한 경우(onError)에 호출할 콜백 함수를
  // 등록합니다. (연결이 끊겼을 때 호출할 콜백 함수를 정의할 수도 있습니다.)
  const joinChatting = useCallback(
    (e) => {
      e.preventDefault();

      if (selectRowId === null) {
        alert("방을 클릭해주세요");

        return;
      }

      if (!sender) {
        alert("닉네임을 입력하세요");

        refSenderInput.current.focus();

        return;
      }

      handleChangeRoom();

      stompClient.current = Stomp.over(
        () => new SockJS("http://localhost:8090/ws")
      );

      stompClient.current.connect({}, onConnected, onError);
    },
    [sender, selectRowId]
  );

  // 연결에 성공한 경우
  // -----------------------------------------------------------------------------------------
  // 메시지 구독을 신청(subscribe)하고, 사용자 등록 메시지를 전송(send)합니다.
  // 메시지 구독을 신청할 때 메시지를 수신했을 때 호출할 콜백 함수(onMessageReceived)를 등록합니다.

  const onConnected = useCallback(() => {
    //stompClient.current.subscribe('/topic/chatting', onMessageReceived);

    console.log("onConneted");

    console.log(selectRowId);

    stompClient.current.subscribe(
      `/sub/chat/room/${selectRowId}`,
      onMessageReceived
    );

    stompClient.current.send(
      "/app/chat.addUser",
      {},
      JSON.stringify({
        sender,
        type: "JOIN",
        roomId: selectRowId,
      })
    );
    console.log("메시지 보내는거 확인완료");
  }, [sender, selectRowId]);

  const handleChangeRoom = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
      setChatHistory([]);
      setIsJoin(false);
    }
  };

  // 서버 연결에 실패한 경우, 로그를 남깁니다.
  const onError = useCallback((error) => {
    console.log("연결실패", error);
  }, []);

  // 채팅 메시지를 전달하는 경우
  // -----------------------------------------------------------------------------------------
  // 메시지 입력창에 메시지를 입력하고 전송 버튼을 클릭했을 때 호출합니다.
  // 채팅 메시지를 전송(send)하고, 메시지 입력창에 내용을 지우고 포커스를 부여합니다.
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();

      if (stompClient) {
        stompClient.current.send(
          "/app/chat.sendMessage",
          {},
          JSON.stringify({ sender, message, type: "CHAT", roomId: selectRowId })
        );
      }
      setMessage("");
      refMessageInput.current.focus();
    },
    [message]
  );
  // 메시지를 수신한 경우
  // -----------------------------------------------------------------------------------------
  // 메시지 구독(subscribe) 신청한 메시지가 수신되었을 때 호출됩니다.
  // 매개변수로 전달된 값(payload.body)을 이용해서 상태변수에 값을 설정합니다.
  // JOIN 메시지인 경우, 채팅 참가 상태를 변경하고,
  // 함께 전달된 이전 채팅 이력(history)을 chatHistory 상태변수에 설정합니다.
  // 그외 메시지인 경우, 메시지를 chatHistory 상태변수에 설정합니다.

  const onMessageReceived = useCallback(
    (payload) => {
      console.log(payload);
      const message = JSON.parse(payload.body);

      console.log("메시지 콜백함수 호출 : ", message);

      if (message.type === "JOIN" && message.sender === sender) {
        console.log(message);
        setIsJoin(true);
        message.history.map((msg) =>
          setChatHistory((chatHistory) => [...chatHistory, msg])
        );
      } else {
        setChatHistory((chatHistory) => [...chatHistory, message]);
      }
    },
    [sender]
  );

  // 채팅 내용 출력 영역을 자동 스크롤
  // -----------------------------------------------------------------------------------------
  // 채팅 내용이 변경된 경우,
  // 출력 영역 보다 채팅 내용이 많은 경우 최신 내용이 보일 수 있도록 스크롤 다운합니다.

  useEffect(() => {
    refDialogDiv.current.scroll({
      top: refDialogDiv.current.scrollHeight,
      behavior: "smooth",
    });

    getChatRoomList();
  }, [chatHistory, selectRowId]);

  return (
    <div className={bc.main_inner}>
      <div className={bc.chatLeft}>
        <div className={bc.chatTitleBox}>
          <TelegramIcon style={{ fontSize: "40px" }} />
          <span>{selectRowId && chatRoomList[selectRowId - 1].roomName}</span>
        </div>
        <div>
          <div className={bc.btnBox}>
            <div className={bc.btnImg}>
              <img className={bc.chatImage} src="/images/chat/농구.png"></img>
              <img className={bc.chatImage} src="/images/chat/배구.png"></img>
              <img
                className={bc.chatImage}
                src="/images/chat/배드민턴.png"
              ></img>
              <img className={bc.chatImage} src="/images/chat/족구.png"></img>
              <img className={bc.chatImage} src="/images/chat/풋살.png"></img>
              <img className={bc.chatImage} src="/images/chat/댄스.png"></img>
              <img className={bc.chatImage} src="/images/chat/헬스.png"></img>
              <img className={bc.chatImage} src="/images/chat/기타.png"></img>
            </div>
            <div className={bc.btnList}>
              {chatRoomList &&
                chatRoomList.map((room, idx) => (
                  <button
                    className={bc.chatBtn}
                    key={idx}
                    onClick={() => {
                      setSelectRowId(room.roomId);

                      handleChangeRoom(); // 추가 함수 호출
                    }}
                  >
                    {room.roomName}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className={bc.chat_wrap}>
          <div className={bc.chat}>
            <div className={bc.dialog} ref={refDialogDiv}>
              <div className={bc.dialog_board}>
                {
                  /* 채팅 내용을 출력 */
                  chatHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`${bc.chat} ${
                        item.sender === sender ? bc.me : bc.other
                      }`}
                    >
                      <span>
                        <b>{item.sender}</b>
                      </span>
                      <span className={bc.date}>{item.createdDt}</span>
                      <br />
                      <span>{item.message}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={bc.divSender}>
              <label>닉네임</label>
              <input
                className={bc.senderInput}
                type="text"
                placeholder="닉네임을 입력하세요."
                maxLength={7}
                ref={refSenderInput}
                value={sender}
                disabled={isJoin}
                onChange={(e) => setSender(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    joinChatting(e);
                  }
                }}
              />
              <input
                type="button"
                value="참가"
                className={bc.btnJoin}
                disabled={isJoin}
                onClick={joinChatting}
              />
            </div>
            <div className={bc.divMessage}>
              <label style={{ color: "white" }}>메시지</label>
              <textarea
                className={bc.messageInput}
                value={message}
                ref={refMessageInput}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    sendMessage(e);
                  }
                }}
              ></textarea>
              <input
                type="button"
                value="전송"
                className={bc.btnSend}
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={bc.chatRight}>
        <ChatList />
      </div>
    </div>
  );
};

export default TestChat2;
