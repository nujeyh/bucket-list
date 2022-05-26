import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BucketList = () => {
  let history = useHistory();

  // 어떤 데이터를 가지고 올 지에 대한 함수를 파라미터로 넣어준다.
  const myLists = useSelector((state) => state.bucket.list);

  return (
    <ListStyle>
      {myLists.map((list, index) => {
        return (
          <ItemStyle
            completed={list.completed}
            className="listItem"
            key={index}
            onClick={() => {
              history.push("/detail/" + index);
            }}
          >
            {list.text}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  border-radius: 10px;
  background-color: ${(props) => (props.completed ? "#bbbbbb" : "#f1f1f1")};
  color: ${(props) => (props.completed ? "#6f6f6f" : null)};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export default BucketList;
