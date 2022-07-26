import { Radio, Space } from 'antd';

function Select({ options }) {
  return (
    <Space direction="vertical">
      {options.items.map((item) => (
        <Radio key={item}>{item}</Radio>
      ))}
    </Space>
  );
}

export default Select;
