import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from 'styled-components';

function Card({
  title,
  desc,
  children,
  onUpButtonClick,
  onDownButtonClick,
  onDeleteButtonClick,
  onClick,
  isSelected,
}) {
  return (
    <CardWrapper isSelected={isSelected}>
      <Head onClick={onClick}>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </Head>
      <Body onClick={onClick}>{children}</Body>

      <ButtonGroupWrapper>
        <ButtonGroup>
          <Button type="text" onClick={onUpButtonClick} icon={<UpOutlined />} />
          <Button
            type="text"
            onClick={onDeleteButtonClick}
            icon={<DeleteOutlined />}
          />
          <Button
            type="text"
            onClick={onDownButtonClick}
            icon={<DownOutlined />}
          />
        </ButtonGroup>
      </ButtonGroupWrapper>
    </CardWrapper>
  );
}

const ButtonGroupWrapper = styled.div`
  position: absolute;
  top: 0;
  left: calc(100%);
  display: none;
`;

const ButtonGroup = styled.div`
  margin-left: 12px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const CardWrapper = styled.div`
  border: ${({ isSelected }) =>
    isSelected ? '3px solid blue' : '1px solid #dddddd'};
  width: 420px;
  margin: 30px auto;
  background-color: #ffffff;
  position: relative;

  &:hover ${ButtonGroupWrapper} {
    display: block;
  }
`;
const Head = styled.div`
  border-bottom: 1px solid #dddddd;
  padding: 16px;
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;
const Desc = styled.div`
  color: #666666;
  margin-left: 4px;
`;
const Body = styled.div`
  padding: 16px;
`;

export default Card;
