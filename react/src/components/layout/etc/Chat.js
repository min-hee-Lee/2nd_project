import style from "../../../css/layout/BaseLayout.module.css";
import chatIcon from "../../../img/ChatIcon_man.png";
import SendIcon from "@material-ui/icons/Telegram";
import SmsIcon from "@material-ui/icons/Sms";
import kakao from "../../../img/kakao.png";
import PhoneIcon from "@material-ui/icons/Phone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import Chatlogo from "../../../img/ChatIcon_woman.png";
import { useRef, useState } from "react";
import ChatAct from "./ChatAct";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false); //채팅 토글 닫혀있는 상태
  const [selectedMenu, setSelectedMenu] = useState(0); // 선택한 메뉴 (0: 기본, 1: 문의, 2: 채팅)
  const [selectQnA, setSelectQnA] = useState(0);
  //문의하기 (0:선택X, 1:공간등록/삭제, 2:예약현황, 3:결제, 4:취소/환불)

  //관리자 채팅 토글 Icon 선택시
  const toggleChat = () => {
    setChatOpen(!chatOpen);
    setSelectedMenu(0); // 문의하기 메뉴 선택으로 초기화
  };

  //전화 Icon hover
  const callRef = useRef(null);
  const phoneHover = () => {
    /*
    const phoneButton = document.querySelector(`.${style.callBtn}`);
    const phoneNum = document.createElement("span");
    phoneNum.textContent = "010-****-****";
    phoneNum.style.position = "absolute";
    phoneNum.style.top = "500px";
    //phoneNum.style.left = "500px";
    phoneNum.style.backgroundColor = "red";
    //document.body.appendChild(phoneNum);
    phoneButton.append(phoneNum);*/

    const phoneButton = callRef.current;
    const phoneNum = document.createElement("span");
    phoneNum.textContent = "010-****-****";
    phoneNum.style.position = "absolute";
    phoneNum.style.padding = "10px";
    phoneNum.style.top = "430px";
    phoneNum.style.right = "5px";
    phoneNum.style.backgroundColor = "gray";
    phoneNum.style.opacity = "0.7";
    phoneNum.style.color = "black";
    phoneNum.style.borderRadius = "10px";
    phoneButton.appendChild(phoneNum);
  };

  const phoneNotHover = () => {
    // const phoneNum = document.querySelector(`.${style.callBtn} > span`);
    // phoneNum.remove();

    const phoneButton = callRef.current;
    phoneButton.removeChild(phoneButton.lastChild);
  };

  return (
    <div className={style.chat_inner}>
      {localStorage.getItem("memberName") === null ? (
        <button onClick={toggleChat} className={style.chatimg}>
          <img src={chatIcon} />
        </button>
      ) : null}
      <div className={style.chat_toggle}>
        {chatOpen && (
          <div className={style.chat_box}>
            <div className={style.content}>
              {selectedMenu === 0 ? (
                <>
                  <div className={style.title}>
                    <div>Lively</div>
                    <button onClick={toggleChat}>
                      <CloseIcon style={{ fontSize: "25px" }} />
                    </button>
                  </div>
                  <div className={style.items}>
                    <section>
                      <h2>문의하기</h2>
                      <div>
                        <p>😊안녕하세요. Lively입니다😊</p>
                        <p>원하시는 문의를 선택해주세요.</p>
                      </div>
                      <div className={style.btn_qna}>
                        <button
                          className="btn_lively"
                          onClick={() => setSelectedMenu(1)}
                        >
                          <SendIcon />
                          <span>문의하기</span>
                        </button>
                      </div>
                    </section>

                    <section>
                      <h2>채팅하기</h2>
                      <p>😊안녕하세요. Lively입니다😊</p>
                      <div className={style.btn_qna}>
                        <button
                          className="btn_lively"
                          onClick={() => setSelectedMenu(2)}
                        >
                          <SmsIcon />
                          <span>채팅하기</span>
                        </button>
                      </div>
                    </section>

                    <section>
                      <h2>다른방법으로 문의하기</h2>
                      <div className={style.other_qna}>
                        {/* <button className={style.kakaoBtn}>
                          <img src={kakao} />
                        </button> */}
                        {/*카카오톡 톡상담 */}
                        <a
                          className={style.kakaoBtn}
                          id="chat-channel-button"
                          href="javascript:chatChannel()"
                        >
                          <img src={kakao} />
                        </a>
                        <button
                          className={style.callBtn}
                          onMouseOver={phoneHover}
                          // onMouseLeave={phoneNotHover}
                          onMouseOut={phoneNotHover}
                          ref={callRef}
                        >
                          <PhoneIcon style={{ fontSize: "25px" }} />
                        </button>
                      </div>
                    </section>
                  </div>
                </>
              ) : selectedMenu === 1 ? (
                <>
                  <div className={style.title}>
                    <button onClick={() => setSelectedMenu(0)}>
                      <ArrowBackIcon style={{ fontSize: "25px" }} />
                    </button>
                    <button onClick={toggleChat}>
                      <CloseIcon style={{ fontSize: "25px" }} />
                    </button>
                  </div>
                  <div className={style.items}>
                    <div className={style.activeBox}>
                      <div className={style.active}>
                        <img src={Chatlogo} />
                        <hr />
                        <p>😊원하시는 문의를 선택해주세요.😊</p>
                        {selectQnA === 0 ? (
                          <>
                            <div className={style.select}>
                              <button
                                className="btn_lively"
                                onClick={() => setSelectQnA(1)}
                              >
                                공간 등록 / 삭제
                              </button>
                              <button
                                className="btn_lively"
                                onClick={() => setSelectQnA(2)}
                              >
                                예약 현황
                              </button>
                              <button
                                className="btn_lively"
                                onClick={() => setSelectQnA(3)}
                              >
                                결제
                              </button>
                              <button
                                className="btn_lively"
                                onClick={() => setSelectQnA(4)}
                              >
                                취소 / 환불
                              </button>
                            </div>
                          </>
                        ) : selectQnA === 1 ? (
                          <>
                            <button
                              className={style.back}
                              onClick={() => setSelectQnA(0)}
                            >
                              뒤로가기
                            </button>
                            <pre className={style.ex}>
                              공간등록을 원하시는 경우에는
                              <br />
                              문의를 통해서 관리자에게 등록이 필요합니다.
                            </pre>
                          </>
                        ) : selectQnA === 2 ? (
                          <>
                            <button onClick={() => setSelectQnA(0)}>
                              뒤로가기
                            </button>
                            <pre className={style.ex}>
                              예약현황은 로그인 후 확인가능하며,
                              <br />
                              마이페이지에서 예약 내역을 확인하실 수 있습니다.
                            </pre>
                          </>
                        ) : selectQnA === 3 ? (
                          <>
                            <button onClick={() => setSelectQnA(0)}>
                              뒤로가기
                            </button>
                            <pre className={style.ex}>
                              결제방법은 카카오페이, 토스 결제방법이 있습니다.
                            </pre>
                          </>
                        ) : selectQnA === 4 ? (
                          <>
                            <button onClick={() => setSelectQnA(0)}>
                              뒤로가기
                            </button>
                            <pre className={style.ex}>
                              취소 및 환불 규정은 -----입니다.
                              <p>
                                세부규정은 각 공간마다 다르므로 <br />
                                상세페이지에서 환불규정을 확인해주세요.
                              </p>
                            </pre>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={style.title}>
                    <button onClick={() => setSelectedMenu(0)}>
                      <ArrowBackIcon style={{ fontSize: "25px" }} />
                    </button>
                    <button onClick={toggleChat}>
                      <CloseIcon style={{ fontSize: "25px" }} />
                    </button>
                  </div>
                  <div className={style.items}>
                    <div className={style.activeBox}>
                      <div className={style.active}>
                        <p>😊안녕하세요. Lively입니다.😊</p>
                        <p>자유롭게 채팅해주세요.</p>
                        <ChatAct />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Chat;
