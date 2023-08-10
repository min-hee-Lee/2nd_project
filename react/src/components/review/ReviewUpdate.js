import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../reduxs/actions/board_action";
import { baseUrl } from "../../apiurl";
import rv from "../../css/review/review.module.css";

const ReviewUpdate = (props) => {
  const dispatch = useDispatch();
  //const navigator = useNavigate();

  const navigator = useNavigate();

  const [tempFile, setTempFile] = useState([]);

  const [imageDelete, setImageDelete] = useState([]);

  const pv = useSelector((state) =>
    state.board.pvReview ? state.board.pvReview : { currentPage: 1 }
  );

  const { currentPage } = pv;

  const { review_code, imageUrl, imagesDTO } = props;

  //const {newImageUrl, setnewImageUrl} = useState(imageUrl);

  //const [images, setImages] = useState(props.imagesDTO);

  //console.log(imagesDTO);

  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible(!isInputVisible);
    setInputs(props);
  };

  //const { content, rating_value, filename } = inputs;

  // const { review_code, content, rating_value } = props;

  const [inputs, setInputs] = useState({
    content: "",
    rating_value: "",
  });
  const { content, rating_value } = inputs;

  useEffect(() => {
    setInputs(props);
  }, [props]);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const deleteConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      review_code: review_code,
      imagesDTO: imagesDTO,
    },
  };

  //console.log('review_code + filepath : ' + review_code, imagesDTO);

  const reviewImagesDelete = async (e, index) => {
    e.preventDefault();

    //console.log('index : ' + index);

    // 이미지 인덱스를 이용해 삭제할 이미지 정보를 찾습니다.
    const deleteImage = imagesDTO[index];

    // imageDelete 배열에 해당 이미지 정보를 추가합니다.
    setImageDelete([...imageDelete, deleteImage]);

    const deleteConfig2 = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        review_code: review_code,
        imagesDTO: [deleteImage],
      },
    };

    //console.log(deleteImage);

    await axios
      .delete(`${baseUrl}/review/updata/delete`, deleteConfig2)
      .then((response) => {
        console.log(response.data);
        // const newImages = imageUrl.filter((_, i) => i !== index);
        // setImageUrl(newImages); // 이미지 리스트에서 해당 이미지 제거
      })
      .catch((err) => {
        console.error(err);
      });

    // 이미지를 삭제한 후, 이미지 리스트에서도 삭제합니다.
    setImageDelete([]);
    //setTempFile({...tempFile,[imagesDTO[index]]:''})
    //setImageUrl({...imageUrl,[imageUrl[index]]:''});

    window.location.reload();
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("rating_value", rating_value);
    formData.append("review_code", review_code);

    if (tempFile != null) {
      for (let i = 0; i < tempFile.length; i++) {
        formData.append("files", tempFile[i]);
      }
    }

    const config2 = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await dispatch(boardActions.getReviewUpdate(formData, config2));

    setInputs({
      content: "",
      rating_value: "",
    });

    window.location.reload();
  };

  return (
    <div className={rv.All}>
      <button
        className={rv.reBtn}
        style={{
          background: "black",
          color: "white",
          fontWeight: "bolder",
          fontSize: "16px",
          width: "90px",
          height: "50px",
          borderRadius: "20px",
        }}
        onClick={handleButtonClick}
      >
        수정
      </button>

      <div className={rv.reviewMain}>
        {isInputVisible && (
          <>
            <form onSubmit={onSubmit}>
              <div className={rv.rBox}>
                {/* <label htmlFor="comment">수정</label> */}
                <div className={rv.rBoxTop}>
                  별점:
                  <input
                    className={rv.rInput}
                    type="text"
                    name="rating_value"
                    value={rating_value}
                    onChange={handleValueChange}
                    /* 별점 수정 */
                  />
                  <textarea
                    className={rv.rText}
                    id="content"
                    name="content"
                    onChange={handleValueChange}
                    value={content}
                    style={{
                      minWidth: "1290px",
                      minHeight: "100px",
                      maxWidth: "1290px",
                      maxHeight: "100px",
                      /* 내용 수정 */
                    }}
                  ></textarea>
                </div>
              </div>
              <input type="hidden" name="comment" value="1"></input>

              <div className={rv.rFileBox}>
                <input
                  className={rv.rFile}
                  type="file"
                  multiple
                  // value={tempFile}
                  onChange={(e) => {
                    setTempFile(e.target.files);
                  }}
                ></input>

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
                >
                  수정완료
                </button>
              </div>
            </form>
            <div className={rv.DImgBox}>
              {imageUrl &&
                imageUrl.map((imageData, index) => (
                  <div className={rv.imgD} key={index}>
                    {
                      <img
                        className={rv.Dimg}
                        key={index}
                        src={`data:image/png;base64,${imageData}`}
                        alt={`${index}`}
                        width={"50"}
                        height={"50"}
                        style={{ marginRight: "20px" }}
                        name={index}
                      />
                    }
                    <button
                      className={rv.DBtn}
                      style={{
                        background: "black",
                        color: "white",
                        fontWeight: "bolder",
                        fontSize: "16px",
                        width: "90px",
                        height: "50px",
                        borderRadius: "20px",
                      }}
                      onClick={(e) => reviewImagesDelete(e, index)}
                    >
                      삭제
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewUpdate;
