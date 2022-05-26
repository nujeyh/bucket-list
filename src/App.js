import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBucketFB, loadBucketFB } from "./redux/modules/bucket";

import BucketList from "./BucketList";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Progress from "./Progress";
import Spinner from "./Spinner";

function App() {
  const text = useRef(null);
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.bucket.isLoaded);

  // store에 새로운 버킷리스트 추가하기
  const addBucket = () => {
    if (text.current.value === "") return;
    dispatch(addBucketFB({ text: text.current.value, completed: false }));
    // 1. action creator 로 action 생성
    // 2. action을 dispatch함 (reducer로 보냄)
    // 3. reducer가 state 변경해줌
    text.current.value = "";
  };

  useEffect(() => {
    dispatch(loadBucketFB());
  }, []);

  // 엔터 누르면 입력되기
  const onPressEnter = (e) => {
    if (e.key === "Enter") {
      addBucket();
    }
  };

  return (
    <AppWrap className="App">
      <Container>
        <Title>나만의 버킷리스트</Title>
        <Progress />
        <Line />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (isLoaded ? <BucketList /> : <Spinner />)}
          />
          <Route path="/detail/:index">
            <Detail />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Container>
      <InputContainer>
        <input type="text" ref={text} onKeyPress={onPressEnter} />
        <button onClick={addBucket}>추가하기</button>
      </InputContainer>
      {/* 맨 위로 올라가기 버튼. smooth 속성 주면 부드럽게 이동 */}
      {/* <button
        onClick={() => {
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        위로 가기
      </button> */}
    </AppWrap>
  );
}

const AppWrap = styled.div`
  background-color: aliceblue;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-items: center;
  position: fixed;
  button {
    appearance: button;
    background-color: #1899d6;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: din-round, sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.8px;
    line-height: 20px;
    margin: auto;
    outline: none;
    overflow: visible;
    padding: 13px 16px;
    text-align: center;
    text-transform: uppercase;
    touch-action: manipulation;
    transform: translateZ(0);
    transition: filter 0.2s;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    height: 45px;
  }
  button:after {
    background-clip: padding-box;
    background-color: #1cb0f6;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  button:main,
  .button-19:focus {
    user-select: auto;
  }

  button:hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }

  button:disabled {
    cursor: auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 50vw;
  max-width: 350px;
  min-width: 330px;
  margin: 10px auto 0 auto;
  height: 80vh;
  max-height: 450px;
  padding: 16px;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  background-color: #ddd;
  height: 1px;
  border: 0;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 50vw;
  max-width: 350px;
  min-width: 330px;
  margin: 10px auto;
  height: 10vh;
  padding: 16px;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  input {
    margin: auto;
    height: 30px;
    width: 65%;
    border: 1px solid silver;
    border-radius: 10px;
  }

  /* outline은 자동으로 생겨서 없애줘야 함 */
  & input:focus {
    outline: none;
    border: 2px solid #1cb0f6;
  }
`;

export default App;
