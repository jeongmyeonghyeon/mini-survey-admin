import { Col, Input, Row } from 'antd';
// import produce from 'immer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OptionSection from '../components/OptionSection';
import PreviewSection from '../components/PreviewSection';
import MainLayout from '../layouts/MainLayout';
import {
  addQuestion,
  deleteQuestion,
  moveDownQuestion,
  moveUpQuestion,
  setTitle,
} from '../stores/survey/surveySlice';

function BuilderPage() {
  const survey = useSelector((state) => state.survey);
  const dispatch = useDispatch();

  return (
    <MainLayout selectedKeys={'builder'}>
      <Row>
        <Col flex="auto">
          <Input
            placeholder="설문 제목을 입력해주세요."
            value={survey.title}
            onChange={(e) => {
              // (1)
              // setData((state) => ({ ...state, title: e.target.value }));

              // (2) immer 적용
              // const newData = produce(data, (draft) => {
              //   draft.title = e.target.value;
              // });
              // setData(newData);

              // (3) react-immer 적용
              // setData(
              //   produce((draft) => {
              //     draft.title = e.target.value;
              //   }),
              // );

              // (4) redux 적용 (redux-toolkit(slice), react-redux)
              dispatch(setTitle(e.target.value));
            }}
          />
          <PreviewSection
            questions={survey.questions}
            addQuestion={(type) => {
              // (1)
              // setData((state) => ({
              //   ...state,
              //   questions: [
              //     ...state.questions,
              //     {
              //       title: 'Untitled',
              //       desc: '',
              //       type: 'text',
              //       required: false,
              //       options: {
              //         max: 20,
              //         placeholder: '',
              //       },
              //     },
              //   ],
              // }));

              // (2) react-immer 적용
              // setData(
              //   produce((draft) => {
              //     draft.questions.push({
              //       title: 'Untitled',
              //       desc: '',
              //       type: 'text',
              //       required: false,
              //       options: {
              //         max: 20,
              //         placeholder: '',
              //       },
              //     });
              //   }),
              // );

              // (3) redux 적용 (redux-toolkit(slice), react-redux)
              dispatch(addQuestion(type));
            }}
            moveUpQuestion={(index) => {
              if (index === 0) {
                return;
              }
              // (1) immer - react 적용
              // setData(
              //   produce((draft) => {
              //     const temp = draft.questions[index];
              //     draft.questions[index] = draft.questions[index - 1];
              //     draft.questions[index - 1] = temp;
              //   }),
              // );

              // (2) redux 적용 (redux-toolkit(slice), react-redux)
              dispatch(moveUpQuestion(index));
            }}
            moveDownQuestion={(index) => {
              if (index === survey.questions.length - 1) {
                return;
              }
              // (1) immer - react 적용
              // setData(
              //   produce((draft) => {
              //     const temp = draft.questions[index];
              //     draft.questions[index] = draft.questions[index + 1];
              //     draft.questions[index + 1] = temp;
              //   }),
              // );

              // (2) redux 적용 (redux-toolkit(slice), react-redux)
              dispatch(moveDownQuestion(index));
            }}
            deleteQuestion={(index) => {
              // (1) immer - react 적용
              // setData(
              //   produce((draft) => {
              //     draft.questions.splice(index, 1);
              //   }),
              // );

              // (2) redux 적용 (redux-toolkit(slice), react-redux)
              dispatch(deleteQuestion(index));
            }}
          />
        </Col>
        <Col flex="350px">
          <OptionSection />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default BuilderPage;
