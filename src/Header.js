// src/Header.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px' }}>
          CleanTable2024
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/releasenotes">Release Notes</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default AppHeader;
