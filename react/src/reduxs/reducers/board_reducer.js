import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  boardList: [],
  pv: { currentPage: 1 },
  boardListDetail: [],
  boardReviewList: [],
  boardFile: null,
  pvReview: { currentPage: 1 },
  ReviewSelectOne: {},
  mapList: [],
  AdminPayList: [],
  UserPayList: [],
  mapBusList: [],
  chatRoomList: [],
  userWishList: [],
  UserReviewList: [],
  pvWishList: { currentPage: 1 },
  pvUserReviewList: { currentPage: 1 },
  Admin_sales_List: [],
  pvAdmin_sales_List: { currentPage: 1 },
  chat_main_list: [],
  Admin_User_Info: [],
  pvAdmin_User_Info: { currentPage: 1 },
  Admin_Review_List: [],
  pvAdmin_Review_List: { currentPage: 1 },
  filter_board_list: [],
  pvfilter: { currentPage: 1 },
  wish_Select_List: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,

  reducers: {
    //action은 데이터 값을 받음  action.payload 에 있음 넘겨준 값이
    //네트워크 통해서 백앤드 접근 정보가져와서,
    // map 으로 왔을거임
    // 밑에 를 호출해서 action 으로 받아서
    // 각각 state 로 저장 < 스토어에 저장?
    // ...state 안써도됌 밑에껄로 초기화됌?

    //초기값에 있는 boardList 에 값을 넣어준다
    getBoardList(state, action) {
      state.boardList = action.payload.data.aList;

      state.pv = action.payload.data.pv;
    },

    getBoardListDetail(state, action) {
      state.boardListDetail = action.payload.data.aList;
    },

    getBoardReviewList(state, action) {
      state.boardReviewList = action.payload.data.ReviewList;

      state.pvReview = action.payload.data.pvReview;
    },

    getReviewSelectOne(state, action) {
      state.ReviewSelectOne = action.payload.data.ReviewOne;
    },

    getMapList(state, action) {
      state.mapList = action.payload.data.mapList;

      state.pvMap = action.payload.data.pvMap;
    },

    getAdminPayList(state, action) {
      state.AdminPayList = action.payload.data.adminPayList;

      state.pv = action.payload.data.pv;
    },

    getUserPayList(state, action) {
      state.UserPayList = action.payload.data.userPayList;

      state.pv = action.payload.data.pv;
    },
    getMapBusList(state, action) {
      state.mapBusList = action.payload.data.mapBusList;
    },

    getChatRoomList(state, action) {
      state.chatRoomList = action.payload.data.chatRoomList;
    },

    getWishList(state, action) {
      state.userWishList = action.payload.data.userWishList;

      state.pvWishList = action.payload.data.pvWishList;
    },

    getUserReviewList(state, action) {
      state.UserReviewList = action.payload.data.UserReviewList;

      state.pvUserReviewList = action.payload.data.pvUserReviewList;
    },

    getAdminSalesList(state, action) {
      state.Admin_sales_List = action.payload.data.Admin_sales_List;

      state.pvAdmin_sales_List = action.payload.data.pvAdmin_sales_List;
    },
    getChatList(state, action) {
      state.chat_main_list = action.payload.data.chat_main_list;
    },

    getAdminUserList(state, action) {
      state.Admin_User_Info = action.payload.data.Admin_User_Info;

      state.pvAdmin_User_Info = action.payload.data.pvAdmin_User_Info;
    },

    getAdminReviewList(state, action) {
      state.Admin_Review_List = action.payload.data.Admin_Review_List;

      state.pvAdmin_Review_List = action.payload.data.pvAdmin_Review_List;
    },

    getFilterList(state, action) {
      state.filter_board_list = action.payload.data.filter_board_list;

      state.pvfilter = action.payload.data.pvfilter;
    },

    getWishSelectList(state, action) {
      state.wish_Select_List = action.payload.data.wish_Select_List;
    },
  },
});

//이걸 이용해서 함수명 자동완성을 할 수 있다.
export const boardReducers = boardSlice.actions;
// boardReducers.getBoardList 이렇게 안해놓으면
// boardSlice.actions.getBoardList 로 사용해야됌 그래서
// 저렇게 선언한거임 밖에서 쉽게 쓰기 위해서
export default boardSlice.reducer;

//이름 조심해야됌  임포트 {}   와 없는 차이는
// 없으면 아무이름이나 쓰고 경로가 맞으면 됌 그러면 default 로 선언된 변수를 임포트함

// 하지만 {} 으로 임포트했을경우 변수명ㅇ ㅣ같아야함
// 리엑트에서 이거 중요함

//그래서 수업시간에 변수명이 같아서 리스트를 못불러오는 해프닝이있었음
// store 에서 boardReducers       defualt
// action  에서 { boardReducers }
//서로 같은이름이지만 위와 같이 서도 다른 변수
