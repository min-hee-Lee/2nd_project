import axios from 'axios';
import { baseUrl } from '../../apiurl';
import { boardReducers } from '../reducers/board_reducer';

function getBoardList(currnetPage, filename) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/board/list/test/${currnetPage}`, {
        params: { filename: filename },
      })
      .then((response) => response.data);

    //console.log(data);

    dispatch(boardReducers.getBoardList({ data }));
  };
}
function getBoardListDetail(main_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/board/list/detail?main_code=${main_code}`)
      .then((response) => response.data);

    //console.log(data);

    dispatch(boardReducers.getBoardListDetail({ data }));
  };
}
// 댓글 리뷰
function getBoardReviewList(currentPage, main_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/board/review/${currentPage}`, {
        params: { main_code: main_code },
      })
      .then((response) => response.data);

    //console.log(data);

    dispatch(boardReducers.getBoardReviewList({ data }));
  };
}

//댓글 쓰기
function getReviewWrite(formData, config) {
  return async (dispatch) => {
    const data = await axios
      .post(`${baseUrl}/board/review`, formData, config)
      .then((response) => console.log(response.data));

    //dispatch(boardReducers.getReviewWrite({ data }));
  };
}

function getReviewSelectOne(review_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/board/review/selectOne/${review_code}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(err.message));

    dispatch(boardReducers.getReviewSelectOne({ data }));
  };
}

function getReviewUpdate(formData, config) {
  return async (dispatch) => {
    const data = await axios
      .put(`${baseUrl}/board/review/update`, formData, config)
      .then((response) => console.log(response.data));
  };
}

function getReviewDelete(review_code) {
  return async (dispatch) => {
    const data = await axios
      .delete(`${baseUrl}/board/review/delete/${review_code}`)
      .then((response) => response.data);
  };
}

function getMapList(currentPage, distance) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/mapList/${currentPage}`, {
        params: distance,
      })
      .then((response) => response.data);
    dispatch(boardReducers.getMapList({ data }));
  };
}

function getAdminPayList(currnetPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/payPage/${currnetPage}`)
      .then((response) => response.data);

    dispatch(boardReducers.getAdminPayList({ data }));
  };
}

function getUserPayList(currnetPage, t_id) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/user/payPage/${currnetPage}`, {
        params: { t_id: t_id },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getUserPayList({ data }));
  };
}
function getMapBusList(latitude, longitude) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/map/busList`, {
        params: { latitude: latitude, longitude: longitude },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getMapBusList({ data }));
  };
}

function getChatRoomList() {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/user/chatList`)
      .then((response) => response.data);
    //{console.log()}

    dispatch(boardReducers.getChatRoomList({ data }));
  };
}

function getWishList(currnetPage, t_id) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/user/wishList/${currnetPage}`, {
        params: { t_id: t_id },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getWishList({ data }));
  };
}

function getUserReviewList(currnetPage, t_id) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/user/reviewList/${currnetPage}`, {
        params: { t_id: t_id },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getUserReviewList({ data }));
  };
}

function getAdminSalesList(currnetPage, filename) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/SalesList/${currnetPage}`, {
        params: { filename: filename },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getAdminSalesList({ data }));
  };
}

function getChatList(filename) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/user/chatMainList`, {
        params: { filename: filename },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getChatList({ data }));
  };
}

function getAdminUserList(currentPage, t_username) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/userInfo/${currentPage}`, {
        params: { t_username: t_username },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getAdminUserList({ data }));
  };
}

function getAdminReviewList(currentPage, content) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/ReviewList/${currentPage}`, {
        params: { content: content },
      })
      .then((response) => response.data);

    dispatch(boardReducers.getAdminReviewList({ data }));
  };
}

function getFilterList(currentPage, filterData) {
  return async (dispatch) => {
    const data = await axios
      .post(`${baseUrl}/board/filter/${currentPage}`, filterData)
      .then((response) => response.data);

    dispatch(boardReducers.getFilterList({ data }));
  };
}

function getWishSelectList(t_id) {
  return async (dispatch) => {
    const data = await axios
      .post(`${baseUrl}/wishUser`, t_id)
      .then((response) => response.data);

    dispatch(boardReducers.getWishSelectList({ data }));
  };
}
export const boardActions = {
  getBoardList,
  getBoardListDetail,
  getBoardReviewList,
  getReviewWrite,
  getReviewSelectOne,
  getReviewUpdate,
  getReviewDelete,
  getMapList,
  getAdminPayList,
  getUserPayList,
  getMapBusList,
  getChatRoomList,
  getWishList,
  getUserReviewList,
  getAdminSalesList,
  getChatList,
  getAdminUserList,
  getAdminReviewList,
  getFilterList,
  getWishSelectList,
};
