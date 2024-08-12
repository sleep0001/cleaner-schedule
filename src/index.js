import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from './Header';
import AppFooter from './Footer';
import CalendarComponent from './calendar';
import LogsPage from './LogsPage';
import V1_1_0 from './releasenote/v1_1_0';
import V1_0_0 from './releasenote/v1_0_0';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd'; // 追加

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Layout.Content style={{ padding: '5px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<CalendarComponent />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/v1_0_0" element={<V1_0_0 />} />
            <Route path="/v1_1_0" element={<V1_1_0 />} />
          </Routes>
        </Layout.Content>
        <AppFooter />
      </Layout>
    </Router>
  </React.StrictMode>
);

reportWebVitals();