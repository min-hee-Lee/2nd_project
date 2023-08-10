import pm from "../../css/review/reviewModal.module.css";

const ReviewModal = ({ isOpen, imageUrl, handleCloseModal }) => {
  return (
    <div
      className={pm.rbModal}
      style={{
        display: isOpen ? "flex" : "none",
        backgroundColor: "rgda(0,0,0,0.7)",
      }}
    >
      <div className={pm.rbModalContent}>
        <img
          src={imageUrl}
          alt="이미지"
          style={{ maxWidth: "700px", maxHeight: "700px", minWidth: "500px" }}
        />
        <button
          className={pm.cb}
          style={{
            background: "black",
            color: "white",
            fontWeight: "bolder",
            fontSize: "16px",
            width: "50px",
            height: "50px",
            borderRadius: "20px",
          }}
          onClick={handleCloseModal}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
