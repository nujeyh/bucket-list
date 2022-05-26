import styled from "styled-components";

import { SentimentVerySatisfiedRounded } from "@material-ui/icons";

const Spinner = () => {
  return (
    <Outer>
      <SentimentVerySatisfiedRounded
        style={{
          color: "#1cb0f6",
          fontSize: "150px",
        }}
      />
    </Outer>
  );
};

const Outer = styled.div`
  background-color: #ffffff;
  width: 300px;
  height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
