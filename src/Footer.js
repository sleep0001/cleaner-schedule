// src/Footer.js
import React from 'react';
import { Layout } from 'antd';
import './Footer.css';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className='footer_class'>
      <div className='footer_text'>
        <p>© 2024 narikiri engineer alliance.</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
