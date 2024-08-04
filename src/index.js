import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CalendarComponent from './calendar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarComponent />
  </React.StrictMode>
);

reportWebVitals();
