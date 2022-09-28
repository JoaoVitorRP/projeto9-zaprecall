import styled from "styled-components";
import play from "../assets/img/play-outline-icon.svg";
import arrows from "../assets/img/Vector.svg";
import correct from "../assets/img/checkmark-circle-icon.svg";
import almost from "../assets/img/help-circle-icon.svg";
import wrong from "../assets/img/close-circle-icon.svg";
import { useState } from "react";

export default function Card(props) {
  const {
    c,
    index,
    disabled,
    setDisabled,
    setButtonsDisable,
    clicked,
    setClicked,
    completed,
  } = props;

  const [flippedStatus, setFlippedStatus] = useState(false);
  const [cardText, setCardText] = useState();

  function revealQuestion(i, text) {
    setClicked(i);
    setDisabled(true);
    setFlippedStatus(true);
    setCardText(text);
    setButtonsDisable(true);
  }

  function revealAnswer(i, text) {
    setDisabled(false);
    setFlippedStatus(false);
    setCardText(text);
    setButtonsDisable(false);
  }

  return (
    <>
      <Flashcard
        key={index}
        isClicked={clicked === index ? true : false}
        isCompleted={completed.includes(index) ? true : false}
      >
        {clicked === index ? `${cardText}` : `Pergunta ${index + 1}`}
        <Button
          onClick={() => revealQuestion(index, c.question)}
          disabled={disabled}
        >
          <PlayImg
            isClicked={clicked === index ? true : false}
            src={play}
          ></PlayImg>
        </Button>
        <ArrowsImg
          isFlipped={flippedStatus}
          isClicked={clicked === index ? true : false}
          src={arrows}
          onClick={() => revealAnswer(index, c.answer)}
        ></ArrowsImg>
      </Flashcard>
      <CompletedCard
        textColor={c.textColor}
        isCompleted={completed.includes(index) ? true : false}
      >
        Pergunta {index + 1}
        <Symbol
          src={
            c.textColor === "#2fbe34"
              ? `${correct}`
              : c.textColor === "#ff922e"
              ? `${almost}`
              : `${wrong}`
          }
        ></Symbol>
      </CompletedCard>
    </>
  );
}

const Flashcard = styled.div`
  display: ${(props) => (props.isCompleted ? "none" : "flex")};
  align-items: ${(props) => (props.isClicked ? "flex-start" : "center")};
  justify-content: space-between;
  position: relative;

  width: 300px;
  height: ${(props) => (props.isClicked ? "131px" : "65px")};
  background: ${(props) => (props.isClicked ? "#FFFFD4" : "#FFFFFF")};
  border-radius: 5px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  padding: 15px;

  font-size: 16px;
  font-weight: ${(props) => (props.isClicked ? "400" : "700")};

  transition: height 0.2s;
`;

const CompletedCard = styled(Flashcard)`
  display: ${(props) => (props.isCompleted ? "flex" : "none")};

  color: ${(props) => props.textColor};
  text-decoration: line-through;
`;

const Symbol = styled.img`
  width: 30px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  background: transparent;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  border: none;
`;

const PlayImg = styled.img`
  width: 30px;
  height: 30px;

  display: ${(props) => (props.isClicked ? "none" : "inherit")};
`;

const ArrowsImg = styled.img`
  width: 30px;
  cursor: pointer;

  position: absolute;
  bottom: 15px;
  right: 15px;

  display: ${(props) => (props.isFlipped ? "inherit" : "none")};
`;
