import { Col, Row } from 'antd';
// import produce from 'immer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BuilderTitleInput from '../components/BuilderTitleInput';
import FloatingButton from '../components/FloatingButton';
import OptionSection from '../components/OptionSection';
import PreviewSection from '../components/PreviewSection';
import MainLayout from '../layouts/MainLayout';
import fetchSurvey from '../services/fetchSurvey';
import { setSelectedQuestionId } from '../stores/selectedQuestionId/selectedQuestionIdSlice';
import { setSurvey } from '../stores/survey/surveySlice';

function BuilderPage() {
  const error = useSelector((state) => state.survey.error);
  const loading = useSelector((state) => state.survey.loading);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    // surveyId 가 있으면, 수정 페이지...!
    if (params.surveyId) {
      dispatch(fetchSurvey(params.surveyId));
    } else {
      dispatch(
        setSurvey({
          title: '',
          questions: [],
        }),
      );
      dispatch(setSelectedQuestionId(null));
    }
  }, [dispatch, params.surveyId]);

  if (error) {
    return 'error';
  }
  if (loading) {
    return 'loading';
  }

  // PreviewSection, OptionSection 에서 직접 스토어의 survey를 가져와서 사용하는 이유.
  // 서로간의 변경사항이 다른 컴포넌트에 렌더링 영향을 주지 않기 위해서 구분.
  return (
    <MainLayout selectedKeys={'builder'} padding={0}>
      <Row style={{ height: '100%' }}>
        <Col flex="auto" style={{ padding: 30 }}>
          <BuilderTitleInput />
          <PreviewSection />
        </Col>
        <Col flex="350px">
          <OptionSection />
        </Col>
      </Row>
      <FloatingButton />
    </MainLayout>
  );
}

export default BuilderPage;
