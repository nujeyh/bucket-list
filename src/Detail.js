import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { updateBucketFB, deleteBucketFB } from "./redux/modules/bucket";

const Detail = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const bucketIndex = params.index;
  const myLists = useSelector((state) => state.bucket.list);
  const myList = myLists[bucketIndex] === undefined ? "" : myLists[bucketIndex];

  return (
    <>
      <Title completed={myList.completed}>{myList.text}</Title>
      <Container>
        {myList.completed === true ? (
          <button
            onClick={() => {
              dispatch(updateBucketFB(myLists[bucketIndex]));
            }}
          >
            ❌ 취소하기
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(updateBucketFB(myLists[bucketIndex]));
            }}
          >
            ✔️ 완료하기
          </button>
        )}

        <button
          onClick={() => {
            dispatch(deleteBucketFB(myLists[bucketIndex].id));
            history.goBack();
          }}
        >
          🗑 삭제하기
        </button>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          ⌫ 뒤로가기
        </button>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: auto;
`;
const Title = styled.h2`
  color: ${(props) => (props.completed ? "#8d8d8d" : null)};
  text-decoration: ${(props) => (props.completed ? "line-through" : null)};
`;

export default Detail;
