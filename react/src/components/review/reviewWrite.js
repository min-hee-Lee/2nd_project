import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import rw from "../../css/review/reviewWrite.module.css";
import { Rating } from "react-simple-star-rating";

const ReviewWrite = ({ onAddComment }) => {
  const sendClick = () => {
    window.location.reload();
  };

  //별점
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
    console.log("클릭 평점 : ", rate);
    console.log(typeof rate);
  };
  // //별점리셋
  // const resetRating = () => {
  //   setRating(0);
  // };

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [tempFile, setTempFile] = useState([]);

  const [inputs, setInputs] = useState({
    main_code: "",
    t_id: "",
    content: "",
    rating_value: "",
    filename: null,
    comment: "",
  });

  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  // console.log("onAddComment", onAddComment);

  const { comment, content, rating_value, filename } = inputs;

  const { main_code } = useParams();

  const pv = useSelector((state) =>
    state.board.pvReview ? state.board.pvReview : { currentPage: 1 }
  );

  //const { t_id } = localStorage.getItem('t_id');

  const handleValueChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   e.preventDefault();

  //   setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("main_code", main_code);
    formData.append("content", content);
    //formData.append("rating_value", rating_value);
    formData.append("rating_value", rating);
    formData.append("booking_code", 1);
    formData.append("t_id", localStorage.id);
    formData.append("re_step", 0);

    if (tempFile != null) {
      for (let i = 0; i < tempFile.length; i++) {
        formData.append("files", tempFile[i]);
      }
    }

    //첨부파일이 있을때
    //if (filename != null) formData.append('filename', filename);

    //답변글이면
    //if (comment === 1) {
    //   formData.append('num', num);
    //   formData.append('ref', ref);
    //   formData.append('re_step', re_step);
    //   formData.append('re_level', re_level);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await dispatch(boardActions.getReviewWrite(formData, config));

    onAddComment(inputs, tempFile);

    setTempFile([]);

    setInputs({
      main_code: "",
      t_id: "",
      content: "",
      rating_value: "",
      filename: null,
      comment: "",
    });

    setIsInputVisible(!isInputVisible);

    setTimeout(() => {
      console.log(inputs); // 예상 결과: { main_code: '', t_id: '', content: '', rating_value: '', filename: null, comment: '' }
    }, 0);

    // window.location.reload();
  };

  return (
    <div className={rw.reviewWriteAll}>
      <div className={rw.writebtn}>
        <button className="btn_lively" onClick={handleButtonClick}>
          후기 작성
        </button>
        <br />
      </div>
      <div className={rw.writeBox}>
        {isInputVisible && (
          <form className={rw.writeForm} onSubmit={onSubmit}>
            <div className={rw.reviewStarBox}>
              <label className={rw.reviewStar} htmlFor="rating_value">
                <Rating
                  onClick={handleRating}
                  /* Available Props */
                />
              </label>
              <input
                type="hidden"
                id="rating_value"
                name="rating_value"
                value={rating}
                onChange={handleValueChange}
              />
            </div>
            <br />
            <div className={rw.reviewInputBox}>
              <label className={rw.reviewInput} htmlFor="content">
                작성:
              </label>
              <textarea
                id="content"
                name="content"
                onChange={handleValueChange}
                style={{
                  minWidth: "1290px",
                  minHeight: "150px",
                  maxWidth: "1290px",
                  maxHeight: "150px",
                }}
              ></textarea>
            </div>

            <div className={rw.reviewfileBox}>
              <div className={rw.reviewfile}>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setTempFile(e.target.files);
                  }}
                ></input>
              </div>
              <div className={rw.reviewEnd}>
                <button
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
                  onClick={sendClick}
                >
                  완료
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewWrite;
