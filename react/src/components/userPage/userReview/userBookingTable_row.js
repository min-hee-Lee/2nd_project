import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ur from "../../../css/userPage/review.module.css";
// import KakaoPayCancle from '../payments/bookingCencel/kakaoPayCancle';
// import PaymentsCancle from '../payments/bookingCencel/paymenstCancle';

const UserReviewTableRow = (props) => {
  const { board } = props;

  //console.log(board);

  //console.log(board.main_code);

  const [imageUrl, setImageUrl] = useState([]);

  const getReviewImages = async () =>
    await axios
      .get(`http://localhost:8090/image/${board.review_code}`, {
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
    <tr>
      <td className={ur.reviewtd}>{board.rm}</td>
      <td className={ur.reviewtd}>
        <>
          <Link to={`/board/list/detail/${board.main_code}`}>
            <img
              alt={board.filename}
              src={board.filepath}
              width="50"
              height="50"
            />
          </Link>
        </>
      </td>

      <td className={ur.reviewtd}>{board.regdate}</td>
      <td className={ur.reviewtd}>{board.moddate}</td>
      <td className={ur.reviewtd}>{board.rating_value}</td>
      <td className={ur.reviewtd}>{board.content}</td>
      <td className={ur.reviewtd} style={{ display: "flex" }}>
        {imageUrl && imageUrl.length > 0 && (
          <>
            {imageUrl.slice(0, 3).map((imageData, index) => (
              <img
                key={index}
                src={`data:image/png;base64,${imageData}`}
                alt={`${index}`}
                width={"50"}
                height={"50"}
                style={{ marginRight: "100px" }}
              />
            ))}
            {imageUrl.length > 3 && <span>...</span>}
          </>
        )}
      </td>
    </tr>
  );
};

export default UserReviewTableRow;
