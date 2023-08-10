import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import { useEffect, useState } from "react";
import ChatTableRow from "./ChattTable_row";
import SearchIcon from "@material-ui/icons/Search";
import bc from "../../css/chat/Chatting2.module.css";

const ChatList = () => {
  const [newfilename, setFilename] = useState({
    filename: "",
  });

  const [userWish, setUserWish] = useState({
    t_id: localStorage.id,
  });

  if (localStorage.getItem("t_id")) {
    setUserWish(localStorage.getItem("t_id"));
  }

  const [wishSelect, setWishSelect] = useState(false);

  const { filename } = newfilename;

  const handleValueChange = (e) => {
    setFilename((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValueSubmit = () => {
    getChatList(filename);
    setFilename({ filename: "" }); // 입력 값 초기화
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleValueSubmit();
    } else if (event.key === "Backspace") {
      setFilename((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value || "",
      }));
    }
  };

  const dispatch = useDispatch();

  const navigator = useNavigate();

  const chatMainList = useSelector((state) => state.board.chat_main_list);

  const wishSelectList = useSelector((state) => state.board.wish_Select_List);

  console.log(chatMainList);

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getChatList = (filename) => {
    dispatch(boardActions.getChatList(filename));
  };

  const getWishSelectList = (t_id) => {
    dispatch(boardActions.getWishSelectList(t_id));
  };

  useEffect(() => {
    console.log("userEffect 호출");
    getChatList(filename);
    getWishSelectList(userWish);
  }, []);

  return (
    <>
      <div className={bc.stickyNavbar}>
        <div className={bc.searchBox}>
          <div className={bc.search}>
            <input
              type="text"
              name="filename"
              placeholder="Search Place..."
              value={newfilename.filename}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 등록
            />
            <button style={{ fontSize: "0px" }} onClick={handleValueSubmit}>
              <SearchIcon
                style={{
                  fontSize: "35px",
                  background: "black",
                  color: "white",
                  // marginLeft: "10px",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={bc.listAll}>
        <div style={{ height: "100%" }}>
          <table className="table">
            <tbody>
              {chatMainList &&
                chatMainList.map((board, index) => {
                  return (
                    <ChatTableRow
                      board={board}
                      key={board.main_code}
                      wishSelectList={wishSelectList}
                    ></ChatTableRow>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ChatList;
