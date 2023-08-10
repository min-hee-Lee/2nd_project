import React, { useState } from "react";
import bo from "../../../../css/gym/reviewBottom.module.css";
import ReviewModal from "./photoModal";
import starF from "../../../../img/starF.png";

const ReviewBottom = () => {
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

  return (
    <div className={bo.rbAll}>
      <div className={bo.rb}>
        <div className={bo.rbContents}>
          <div className={bo.rbStar}>
            <img src={starF} /> <span>5</span>
          </div>
          |
          <div className={bo.user}>
            <span>조현수</span>
          </div>
          |
          <div className={bo.date}>
            <span>2001.12.06</span>
          </div>
          |
          <div className={bo.time}>
            <span>18:37:55</span>
          </div>
          <button className="btn_lively">수정</button>
        </div>
        <div className={bo.rbTextBox}>
          <p className={bo.rbText}>
            하라는대로 가라는대로 가려 해봐도
            <br />
            나의 발길이 나를 이끄네
            <br />
            갈 수 없지만 가고 싶은 곳
            <br />
            <br />
            하늘과 맞닿은 수평선 날 불러
            <br />
            그 누구도 모르는 곳
            <br />
            바다에 나가면 바람이 도와줄까
            <br />
            알고싶어
            <br />
            <br />
            떠나면 얼마나 멀리 가게될까
          </p>
        </div>
        <div className={bo.rbPhotoBox}>
          <img
            src="/images/shu1.jpg"
            onClick={() => handleImageClick("/images/shu1.jpg")}
          />
          <img
            src="/images/shu2.jpg"
            onClick={() => handleImageClick("/images/shu2.jpg")}
          />
          <img
            src="/images/shu6.jpg"
            onClick={() => handleImageClick("/images/shu6.jpg")}
          />
          <img
            src="/images/shu4.jpg"
            onClick={() => handleImageClick("/images/shu4.jpg")}
          />
          <img
            src="/images/shu5.jpg"
            onClick={() => handleImageClick("/images/shu5.jpg")}
          />
        </div>
      </div>
      <div className={bo.rb}>
        <div className={bo.rbContents}>
          <div className={bo.rbStar}>
            <img src={starF} /> <span>5</span>
          </div>
          |
          <div className={bo.user}>
            <span>조현수</span>
          </div>
          |
          <div className={bo.date}>
            <span>2001.12.06</span>
          </div>
          |
          <div className={bo.time}>
            <span>18:37:55</span>
          </div>
          <button className="btn_lively">수정</button>
        </div>
        <div className={bo.rbTextBox}>
          <p className={bo.rbText}>
            하라는대로 가라는대로 가려 해봐도
            <br />
            나의 발길이 나를 이끄네
            <br />
            갈 수 없지만 가고 싶은 곳
            <br />
            <br />
            하늘과 맞닿은 수평선 날 불러
            <br />
            그 누구도 모르는 곳
            <br />
            바다에 나가면 바람이 도와줄까
            <br />
            알고싶어
            <br />
            <br />
            떠나면 얼마나 멀리 가게될까
          </p>
        </div>
        <div className={bo.rbPhotoBox}>
          <img
            src="/images/shu7.jpg"
            onClick={() => handleImageClick("/images/shu7.jpg")}
          />
          <img
            src="/images/shu8.jpg"
            onClick={() => handleImageClick("/images/shu8.jpg")}
          />
          <img
            src="/images/shu9.jpg"
            onClick={() => handleImageClick("/images/shu9.jpg")}
          />
          <img
            src="/images/shu10.jpg"
            onClick={() => handleImageClick("/images/shu10.jpg")}
          />
          <img
            src="/images/shu11.jpg"
            onClick={() => handleImageClick("/images/shu11.jpg")}
          />
        </div>
        <ReviewModal
          isOpen={rModalOpen}
          imageUrl={modalImageUrl}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default ReviewBottom;
