import { Button, Form, Input, InputNumber, Switch } from 'antd';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setQuestion } from '../../stores/survey/surveySlice';

const groups = [
  {
    title: '공통 옵션',
    fields: [
      {
        label: '질문',
        name: 'title',
        rules: [{ required: true }],
        type: 'text',
      },
      {
        label: '설명',
        name: 'desc',
        rules: [{ required: true }],
        type: 'text',
      },
      {
        label: '필수 여부',
        name: 'required',
        rules: [{ required: true }],
        type: 'switch',
        valuePropName: 'checked',
      },
    ],
  },
];

const detailFieldsMap = {
  text: [
    {
      label: 'Placeholder',
      name: 'placeholder',
      rules: [{ required: false }],
      type: 'text',
    },
    {
      label: '최대 입력 길이',
      name: 'max',
      rules: [{ required: false }],
      type: 'number',
    },
  ],
  textarea: [
    {
      label: 'Placeholder',
      name: 'placeholder',
      rules: [{ required: false }],
      type: 'text',
    },
    {
      label: '최대 입력 길이',
      name: 'max',
      rules: [{ required: false }],
      type: 'number',
    },
  ],
  select: [
    {
      label: '답변',
      name: 'items',
      rules: [{ required: true }],
      type: 'text',
    },
    {
      label: '최대 선택 가능 개수',
      name: 'max',
      rules: [{ required: false }],
      type: 'number',
    },
  ],
};

const getFieldInput = (type) => {
  if (type === 'text') {
    return <Input />;
  } else if (type === 'switch') {
    return <Switch />;
  } else if (type === 'number') {
    return <InputNumber />;
  }

  return null;
};

function OptionSection() {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const question = useSelector((state) =>
    state.survey.data?.questions === null
      ? null
      : state.survey.data?.questions[state.selectedQuestionId.data],
  );
  const selectedQuestionId = useSelector(
    (state) => state.selectedQuestionId.data,
  );
  useEffect(() => {
    if (!question) return;

    const type = question.type;
    const detailFieldsValue = {};
    if (type === 'text' || type === 'textarea') {
      detailFieldsValue.max = question.options.max;
      detailFieldsValue.placeholder = question.options.placeholder;
    } else if (type === 'select') {
      detailFieldsValue.max = question.options.max;
      detailFieldsValue.items = question.options.items.join(';');
    }
    form.setFieldsValue({
      title: question.title,
      desc: question.desc,
      required: question.required,
      ...detailFieldsValue,
    });
  }, [question, form]);

  const mergedGroups = question
    ? [
        ...groups,
        {
          title: '세부 옵션',
          fields: detailFieldsMap[question.type],
        },
      ]
    : [];

  return (
    <OptionSectionWrapper>
      <Title>문항 옵션</Title>
      <FormWrapper>
        {question ? (
          <Form
            form={form}
            name="option-form"
            layout="vertical"
            autoComplete="off"
          >
            {mergedGroups.map((group, index) => (
              <Fragment key={index}>
                <SubTitle>{group.title}</SubTitle>
                {group.fields.map((field, _index) => (
                  <Form.Item {...field} key={_index}>
                    {getFieldInput(field.type)}
                  </Form.Item>
                ))}
              </Fragment>
            ))}

            {/* <SubTitle>공통 옵션</SubTitle>
            <Form.Item label="질문" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="설명" name="desc" rules={[{ required: true }]}>
              <Input />
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  // console.log('submit', form.getFieldValue());
                  // form.setFieldsValue({
                  //   title: question.title,
                  //   desc: question.desc,
                  // });
                  const { title, desc, required, ...options } =
                    form.getFieldValue();

                  const values = {
                    title,
                    desc,
                    required,
                    options,
                    type: question.type,
                  };

                  dispatch(
                    setQuestion({ index: selectedQuestionId, data: values }),
                  );
                }}
              >
                적용
              </Button>
            </Form.Item>
          </Form>
        ) : (
          '질문을 선택해주세요.'
        )}
      </FormWrapper>
    </OptionSectionWrapper>
  );
}

const OptionSectionWrapper = styled.div`
  height: 100%;
  background: #ffffff;
  border-left: 1px solid #dddddd;
`;
const Title = styled.div`
  font-weight: 500;
  background-color: #f0f0f0;
  border-bottom: 1px solid #dddddd;
  padding: 12px 0;
  text-align: center;
`;
const FormWrapper = styled.div`
  padding: 24px;
`;
const SubTitle = styled.div`
  font-size: 1.03rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

export default OptionSection;
