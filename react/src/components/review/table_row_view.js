import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { boardActions } from "../../reduxs/actions/board_action";
import { useDispatch, useSelector } from "react-redux";
import ReviewUpdate from "./ReviewUpdate";
import rt from "../../css/review/table.module.css";
import ReviewModal from "./reviewModal";

//Accordion------------------------------------------------------------------
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const ReviewTableRow = (props) => {
  //Accordion style
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: "18px",
      color: "gray",
    },
  }));
  const classes = useStyles();

  const [rModalOpen, setRModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  const handleImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setRModalOpen(true);
  };

  const handleCloseModal = () => {
    setRModalOpen(false);
    setModalImageUrl("");
  };

  const dispatch = useDispatch();
  const { boardreviewList } = props;
  console.log(boardreviewList);

  const imagesIoop = [];
  if (boardreviewList.imagesDTO.length > 0) {
    for (let i = 0; i < boardreviewList.imagesDTO.length; i++) {
      imagesIoop.push(i);
    }
  }

  const ReviewDelete = async (e) => {
    e.preventDefault();

    await dispatch(boardActions.getReviewDelete(boardreviewList.review_code));

    window.location.reload();
  };

  const [imageUrl, setImageUrl] = useState([]);

  const getReviewImages = async () =>
    await axios
      .get(`http://localhost:8090/image/${boardreviewList.review_code}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const images = Array.from(new Uint8Array(response.data))
          .map((byte) => String.fromCharCode(byte))
          .join("")
          .split("\n");

        //console.log(images);
        //console.log(JSON.parse(images[0]).body);
        setImageUrl(JSON.parse(images[0]).body);
      })
      .catch((error) => console.log(error));

  useEffect(() => {
    getReviewImages();
  }, []);

  return (
    <div className={rt.All}>
      {boardreviewList.re_step === 0 ? (
        <div className={rt.reviewUser}>
          <div className={rt.reviewInfoBox}>
            <div className={rt.reviewInfo}>
              <div className={rt.num}>{boardreviewList.review_code}</div>
              <div className={rt.star}>⭐{boardreviewList.rating_value}</div>|
              <div className={rt.id}>
                {boardreviewList.user.t_username &&
                  boardreviewList.user.t_username}
              </div>
              | <div className={rt.rd}>{boardreviewList.regdate}</div>|
              <div className={rt.md}>{boardreviewList.moddate}</div>
              {/* <td>{boardreviewList.filename}</td>
              <td>{boardreviewList.filepath}</td> */}
            </div>
            {boardreviewList.user.t_username === localStorage.username ? (
              <div className={rt.btnC}>
                <button
                  style={{
                    background: "black",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "16px",
                    width: "90px",
                    height: "50px",
                    borderRadius: "20px",
                    marginRight: "5px",
                  }}
                  onClick={ReviewDelete}
                >
                  삭제
                </button>
              </div>
            ) : null}
          </div>
          <div className={rt.reviewMainBox}>
            <div className={rt.reviewMain}>
              <pre>{boardreviewList.content}</pre>
            </div>
            {boardreviewList.user.t_username === localStorage.username ? (
              <div className={rt.btnB}>
                <ReviewUpdate
                  review_code={boardreviewList.review_code}
                  rating_value={boardreviewList.rating_value}
                  content={boardreviewList.content}
                  imageUrl={imageUrl}
                  // setImageUrl = {setImageUrl}
                  imagesDTO={boardreviewList.imagesDTO}
                >
                  수정
                </ReviewUpdate>
              </div>
            ) : null}
          </div>
          {/*
          <div className={rt.reviewImgBox}>
            {imageUrl &&
              imageUrl.map((imageData, index) => (
                <img
                  className={rt.reviewImg}
                  key={index}
                  src={`data:image/png;base64,${imageData}`}
                  alt={`${index}`}
                  width={"180"}
                  height={"180"}
                  style={{
                    marginLeft: "9px",
                    marginRight: "9px",
                    objectFit: "cover",
                  }}
                  onClick={() =>
                    handleImageClick(`data:image/png;base64,${imageData}`)
                  }
                />
              ))}
          </div>
*/}

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>이미지보기...</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={rt.reviewImgBox}>
                  {imageUrl &&
                    imageUrl.map((imageData, index) => (
                      <img
                        className={rt.reviewImg}
                        key={index}
                        src={`data:image/png;base64,${imageData}`}
                        alt={`${index}`}
                        width={"180"}
                        height={"180"}
                        style={{
                          marginLeft: "9px",
                          marginRight: "9px",
                          objectFit: "cover",
                        }}
                        onClick={() =>
                          handleImageClick(`data:image/png;base64,${imageData}`)
                        }
                      />
                    ))}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <div className={rt.btnA}>
            <CommentForm review_code={boardreviewList.review_code}>
              답변
            </CommentForm>
          </div>
        </div>
      ) : null}

      <br />

      <div className={rt.reviewBottom}>
        <div className={rt.reviewBottomText}>
          {boardreviewList.re_step > 0 ? (
            <>
              <div className={rt.reviewPlus}>
                <>
                  <img
                    alt="level"
                    src="/images/logo.png"
                    // width={20 * boardreviewList.re_level}
                    height="20%"
                    width="20%"
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                  />
                  {/* <img alt="re" src="/images/re.gif" /> */}
                </>
                <div className={rt.reviewManager}>
                  <span>{boardreviewList.content}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <ReviewModal
        isOpen={rModalOpen}
        imageUrl={modalImageUrl}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default ReviewTableRow;
