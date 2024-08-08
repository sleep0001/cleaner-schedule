// src/Footer.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
      <Menu theme="dark" mode="horizontal" style={{ justifyContent: 'center', border: 'none', margin: '0' }}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/releasenotes">Release Notes</Link>
        </Menu.Item>
      </Menu>
      <div style={{ marginTop: '10px' }}>
        <p>© 2024 narikiri engineer alliance.</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
