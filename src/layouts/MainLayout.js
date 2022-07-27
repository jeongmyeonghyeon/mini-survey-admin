import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [getItem('설문 조사 관리', 'list', <Link to="/list" />)];

function MainLayout({ selectedKeys, children, padding = 45 }) {
  const contentStyle = useMemo(() => {
    return { padding };
  }, [padding]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
