import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from './Header';
import AppFooter from './Footer';
import CalendarComponent from './calendar';
import ReleaseNotes from './releasenotes';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd'; // 追加

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Layout.Content style={{ padding: '60px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<CalendarComponent />} />
            <Route path="/releasenotes" element={<ReleaseNotes />} />
          </Routes>
        </Layout.Content>
        <AppFooter />
      </Layout>
    </Router>
  </React.StrictMode>
);

reportWebVitals();