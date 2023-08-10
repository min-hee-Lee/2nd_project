import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import cf from "../../css/review/commentForm.module.css";

const CommentForm = (props) => {
  const dispatch = useDispatch();
  //const navigator = useNavigate();

  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const [inputs, setInputs] = useState({
    main_code: "",
    t_id: "",
    content: "",
    rating_value: "",
    filename: null,
  });

  const { content, rating_value, filename } = inputs;

  const { review_code } = props;

  const { currentPage } = useParams();

  //console.log(review_code);

  const { main_code } = useParams();

  //const { t_id } = localStorage.getItem('t_id');

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("main_code", main_code);
    formData.append("content", content);
    formData.append("rating_value", 0);
    formData.append("t_id", 1);
    formData.append("booking_code", 1);
    formData.append("ref", review_code);
    formData.append("re_step", 1);
    formData.append("re_level", 0);

    //첨부파일이 있을때
    if (filename != null) formData.append("filename", filename);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await dispatch(boardActions.getReviewWrite(formData, config));

    setInputs({
      main_code: "",
      t_id: "",
      content: "",
      rating_value: "",
      filename: null,
    });

    window.location.reload();
  };

  return (
    <div className={cf.CommentAll}>
      <div className={cf.CommentBtn}>
        <button
          style={{
            background: "black",
            color: "white",
            fontWeight: "bolder",
            fontSize: "16px",
            width: "180px",
            height: "50px",
            borderRadius: "20px",
          }}
          onClick={handleButtonClick}
        >
          답변
        </button>
      </div>
      <div className={cf.formAll}>
        {isInputVisible && (
          <form onSubmit={onSubmit}>
            <div>
              <label className={cf.formIn} htmlFor="comment"></label>
              <textarea
                id="content"
                name="content"
                onChange={handleValueChange}
                style={{
                  minWidth: "1260px",
                  minHeight: "100px",
                  maxWidth: "1260px",
                  /* 내용 수정 */
                }}
              ></textarea>
            </div>
            <input type="hidden" name="comment" value="1"></input>
            <button
              className={cf.EndBtn}
              style={{
                background: "black",
                color: "white",
                fontWeight: "bolder",
                fontSize: "16px",
                width: "90px",
                height: "50px",
                borderRadius: "20px",
              }}
              type="submit"
            >
              완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
