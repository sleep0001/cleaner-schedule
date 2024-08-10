// src/Header.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '2',
      label: <Link to="/v1_1_0">v1_1_0</Link>,
    },
    {
      key: '3',
      label: <Link to="/v1_0_0">v1_0_0</Link>,
    }
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px' }}>
          CleanTable2024
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
      </Header>
    </Layout>
  );
};

export default AppHeader;
