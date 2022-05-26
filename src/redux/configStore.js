import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/bucket";

// 미들웨어도 하나로 묶는다.
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

// 리듀서들을 합쳐서 스토어를 만든다.
const rootReducer = combineReducers({ bucket });

const store = createStore(rootReducer, enhancer);

export default store;
