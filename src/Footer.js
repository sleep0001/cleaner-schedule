// src/Footer.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const AppFooter = () => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '2',
      label: <Link to="/releasenotes">Release Notes</Link>,
    },
  ];

  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ justifyContent: 'center', border: 'none', margin: '0' }}
        items={menuItems}
      />
      <div style={{ marginTop: '10px' }}>
        <p>© 2024 narikiri engineer alliance.</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
