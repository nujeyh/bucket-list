import styled from "styled-components";
import { useSelector } from "react-redux";

// Progress bar
// 배경이될 div를 두고, 위에 진행도를 나타낼 div를 겹친다.
// 진행도 : (완료 상태인 버킷리스트 개수) / (전체 버킷리스트 개수)
const Progress = () => {
  const bucketList = useSelector((state) => state.bucket.list);
  let completedCount = 0;

  bucketList.map((item, index) => {
    if (item.completed === true) completedCount++;
  });
  const progress = (completedCount / bucketList.length) * 100;
  return (
    <Container>
      <ProgressBar>
        <Highlight width={progress + "%"} />
      </ProgressBar>
      <p>{Boolean(progress) == false ? "0%" : progress.toFixed(0) + "%"}</p>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding-right: 5px;
`;
const ProgressBar = styled.div`
  background-color: #e7e7e7;
  width: 100%;
  height: 30px;
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  display: flex;
  align-items: center;
  margin: auto 10px;
`;
const Highlight = styled.div`
  background-color: #1cb0f6;

  /* 애니메이션 효과 */
  /* [몇초동안 지속될지] [어떤 곳에 효과줄지] */
  /* 지금은 변하는 값이 width뿐이라 생략해도 된다. */
  transition: 1s width;

  width: ${(props) => props.width};
  height: 30px;
  border-radius: 40px;
`;

export default Progress;
