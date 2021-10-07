import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { uiActions } from "../../../store/uiSlice";
import Bg from "../../ui/Background/Bg";
import classes from "./FeedbackModal.module.scss";
import { getBgProps } from "../../../lib/brandAssets";
import Img from "../../ui/Image/Img";
import Header from "../../ui/Header/Header";
import Button from "../../ui/Button/Button";
import { gameActions } from "../../../store/gameSlice";
import hashCode from "../../../lib/hashCode";
import classNames from "../../../lib/classNames";
import FeedbackModalScore from "./FeedbackModalScore";

const FeedbackModal = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const {
    currentQuestionIndex,
    answerList: { isCorrect, scores },
    questionList: { questions },
  } = game;

  const result = isCorrect[currentQuestionIndex];
  const { feedback } = questions[currentQuestionIndex];
  const score = scores[currentQuestionIndex];

  const hideModalsHandler = () => {
    dispatch(uiActions.hideQuestion());
    dispatch(uiActions.hideFeedback());
  };

  return (
    <>
      <div className={classes.backdrop} onClick={hideModalsHandler} />
      <div className={classes.modal}>
        <motion.div
          className={classNames(classes.content, !result && classes.negative)}
        >
          <Bg className={classes.bg} />

          <div className={classes.scores}>
            <Img
              {...getBgProps(result ? "correctModal" : "incorrectModal")}
              className={classes.bgSky}
            />
            <div className={classes.info}>
              <Header className={classes.header}>能量值</Header>
              <FeedbackModalScore result={result} score={score} />
            </div>
          </div>

          <div className={classes.explaination}>
            <h2>{result ? "回答正确" : "回答错误"}</h2>
            <p>{feedback}</p>
            <Button onClick={hideModalsHandler}>继续旅程</Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FeedbackModal;
