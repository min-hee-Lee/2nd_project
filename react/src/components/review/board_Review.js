import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardActions } from "../../reduxs/actions/board_action";

import PageNavigationReview from "./page_nav_view";

import ReviewTableRow from "./table_row_view";

import ReviewWrite from "./reviewWrite";
import rl from "../../css/review/revireLayout.module.css";

const BoardReView = () => {
  // const handleUImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);

  // };
  const [review, setReview] = useState([]);

  const pvReview = useSelector((state) => state.board.pvReview);
  //const currentPage = pvReview.currentPage;
  const { main_code, currentPage = 1 } = useParams();
  //const { main_code } = useParams();
  // console.log(`main_code : ${main_code}`);
  // console.log(`currentPage : ${currentPage}`);

  const dispatch = useDispatch();
  const [boardreviewList2, setBoardReviewList] = useState([]);

  const handleAddComment = (newComment) => {
    setBoardReviewList((prevComments) =>
      Object.assign({}, prevComments, { [newComment.id]: newComment })
    );
  };

  const boardreviewList = useSelector((state) => state.board.boardReviewList);

  const pv = useSelector((state) =>
    state.board.pvReview ? state.board.pvReview : { currentPage: 1 }
  );

  const config = {
    //form enctype 으로
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getBoardReviewList = async (currentPage, main_code) => {
    const list = await dispatch(
      boardActions.getBoardReviewList(currentPage, main_code)
    );
    setBoardReviewList(list);
  };

  useEffect(() => {
    getBoardReviewList(currentPage, main_code);

    //setReview(getBoardReviewList(currentPage, main_code));
  }, [currentPage, main_code, dispatch, boardreviewList2]);

  // return (
  //   <div className={rl.reviewAll}>
  //     <div className={rl.reviewB}>
  //       <ReviewWrite onAddComment={handleAddComment}></ReviewWrite>
  //     </div>

  //     <div>
  //       {boardreviewList &&
  //         boardreviewList.map((boardreviewList) => {
  //           return (
  //             <ReviewTableRow
  //               boardreviewList={boardreviewList}
  //               key={boardreviewList.rm}
  //             ></ReviewTableRow>
  //           );
  //         })}
  //     </div>

  //     {pv ? (
  //       <PageNavigationReview
  //         main_code={main_code}
  //         getBoardReviewList={getBoardReviewList}
  //       />
  //     ) : (
  //       ""
  //     )}
  //   </div>
  // );

  return (
    <div className={rl.reviewAll}>
      {/* <ReviewTop /> */}
      <div className={rl.reviewB}>
        <ReviewWrite onAddComment={handleAddComment}></ReviewWrite>
      </div>
      <table className="table table-striped">
        <colgroup>
          <col width="8%"></col>
        </colgroup>

        <thead>
          <tr>
            {/* <th>사진 번호</th> */}
            {/* <th>사진 이름</th> */}
            {/* <th>사진</th> */}
          </tr>
        </thead>
        <tbody>
          {boardreviewList &&
            boardreviewList.map((boardreviewList) => {
              return (
                <ReviewTableRow
                  boardreviewList={boardreviewList}
                  key={boardreviewList.rm}
                ></ReviewTableRow>
              );
            })}
        </tbody>
      </table>

      {pv ? (
        <PageNavigationReview
          main_code={main_code}
          getBoardReviewList={getBoardReviewList}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BoardReView;
