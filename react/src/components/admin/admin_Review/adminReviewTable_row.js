import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { boardActions } from "../../../reduxs/actions/board_action";

const AdminReviewTableRow = (props) => {
  const { board } = props;

  const dispatch = useDispatch();

  console.log(board);

  const [imageUrl, setImageUrl] = useState([]);

  console.log(imageUrl);

  const ReviewDelete = async (e) => {
    e.preventDefault();

    await dispatch(boardActions.getReviewDelete(board.review_code));

    window.location.reload();
  };

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

  //console.log(board.main_code);

  return (
    <tr>
      <td>{board.user.t_username}</td>
      <td width={80}>{board.rating_value}</td>
      <td>{board.regdate}</td>
      <td>{board.content}</td>
      <td width={700}>
        {imageUrl &&
          imageUrl.map((imageData, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${imageData}`}
              alt={`${index}`}
              width={"50"}
              height={"50"}
              style={{ marginRight: "10px" }}
            />
          ))}
      </td>
      <td>
        <button className="btn_lively" onClick={ReviewDelete}>
          삭제
        </button>
      </td>
    </tr>
  );
};

export default AdminReviewTableRow;
