import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import boardReducers from "./reducers/board_reducer";

const store = configureStore({
  reducer: { board: boardReducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true 지만 배포할 때 코드를 숨기기 위해 false러 변환하기 쉽게 설정을 해놓는다.
});

export default store;
