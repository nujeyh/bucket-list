import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Actions
// Action type = "모듈명/Action"
// String 타입을 사용하면 오타가 났을 경우 알아채기 힘들기 때문에 미리 정의
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const LOADED = "bucket/LOADED";

// 초기값 설정
const initialState = {
  isLoaded: false,
  list: [],
};

// Action Creator
export function loadBucket(bucketList) {
  return { type: LOAD, bucketList };
}

export function createBucket(bucket) {
  return { type: CREATE, bucket };
}

export function deleteBucket(bucketIndex) {
  return { type: DELETE, bucketIndex };
}

export function updateBucket(bucketIndex) {
  return { type: UPDATE, bucketIndex };
}

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}
// 비동기 통신을 도와주는 미들웨어
// action -> middleware -> reducer로 데이터 수정 단계가 추가된다.
// redux-thunk
// 객체 대신 함수를 생성하는 액션 생성 함수를 작성할 수 있게 해준다.
// 리덕스는 action 객체를 dispatch하기 때문에 함수를 생성하면 특정 액션이
// 발생하기 전에 조건을 주거나, 어떤 행동을 사전에 처리할 수 있다.
export const loadBucketFB = () => {
  return async function (dispatch) {
    const bucketData = await getDocs(collection(db, "bucket"));

    let bucketList = [];
    bucketData.forEach((data) => {
      bucketList.push({ id: data.id, ...data.data() });
    });
    dispatch(loadBucket(bucketList));
  };
};

export const addBucketFB = (bucket) => {
  return async function (dispatch) {
    // isLoaded 상태 변경
    dispatch(isLoaded(false));

    const docRef = await addDoc(collection(db, "bucket"), bucket);
    dispatch(createBucket({ id: docRef.id, ...bucket }));
  };
};

export const updateBucketFB = (bucket) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "bucket", bucket.id);

    // 완료 상태를 반대로 설정해준다.
    if (bucket.completed === false) {
      await updateDoc(docRef, { completed: true });
    } else {
      await updateDoc(docRef, { completed: false });
    }

    const _bucketList = getState().bucket.list;
    const bucketIndex = _bucketList.findIndex((item) => {
      return item.id === bucket.id;
    });
    dispatch(updateBucket(bucketIndex));
  };
};

export const deleteBucketFB = (bucketId) => {
  return async function (dispatch, getState) {
    // 파라미터가 필요한 작업엔 값을 받지 못했을 경우를 대비한다.
    if (!bucketId) {
      window.alert("아이디를 잃어버렸다..");
      return;
    }
    dispatch(isLoaded(false));
    const docRef = doc(db, "bucket", bucketId);
    await deleteDoc(docRef);

    const _bucketList = getState().bucket.list;
    const bucketIndex = _bucketList.findIndex((item) => {
      return item.id === bucketId;
    });

    dispatch(deleteBucket(bucketIndex));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/LOAD": {
      return { list: action.bucketList, isLoaded: true };
    }
    case "bucket/CREATE": {
      // 기존 버킷 리스트와 새로 입력된 버킷 항목을 합쳐서 새 버킷 리스트를 만든다.
      const newBucketList = [...state.list, action.bucket];
      return { ...state, list: newBucketList, isLoaded: true };
    }

    case "bucket/DELETE": {
      // 삭제할 항목의 인덱스를 받아서 filter를 사용하여 새 버킷 리스트를 만든다.
      const newBucketList = state.list.filter((item, index) => {
        return parseInt(action.bucketIndex) !== index;
      });
      return { ...state, list: newBucketList, isLoaded: true };
    }

    case "bucket/UPDATE": {
      // 업데이트할 요소의 인덱스를 받아서 해당 요소만 completed를 변경해준다.
      const newBucketList = state.list.map((item, index) => {
        if (
          parseInt(action.bucketIndex) === index &&
          item.completed === false
        ) {
          return { ...item, completed: true };
        } else if (
          parseInt(action.bucketIndex) === index &&
          item.completed === true
        ) {
          return { ...item, completed: false };
        } else {
          return item;
        }
      });
      return { ...state, list: newBucketList };
    }

    case "bucket/LOADED": {
      return { ...state, isLoaded: action.loaded };
    }
    default:
      return state;
  }
}
