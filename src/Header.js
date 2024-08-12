import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css';

const { Header } = Layout;

const AppHeader = () => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'sub1',
      label: 'More',
      children: [
        {
          key: '2',
          label: <Link to="/logs">logs</Link>,
        },
        {
          key: '3',
          label: <Link to="/v1_1_0">v1_1_0</Link>,
        },
        {
          key: '4',
          label: <Link to="/v1_0_0">v1_0_0</Link>,
        },
      ],
    }
  ];

  return (
    <Layout>
      <Header className='header_class'>
        <div className="logo">
          <Link to="/" className='logo_text'>OPRO2024</Link>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
      </Header>
    </Layout>
  );
};

export default AppHeader;
