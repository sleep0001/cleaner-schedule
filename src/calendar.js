import React, { useState } from 'react';
import { Calendar } from 'antd';
import eventsData from './schedule.json'; // ファイルのインポート
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [events] = useState(eventsData); // useStateを使ってデータを取得

  const dateCellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);

    let className = 'ant-picker-calendar-date-content';
    if (eventInfo) {
      // 予定の種類に応じてクラスを追加
      if (eventInfo.events.includes('野際・武﨑・内山')) {
        className += ' team1';
      } else if (eventInfo.events.includes('山崎・駒村')) {
        className += ' team2';
      } else if (eventInfo.events.includes('岡野・田中')) {
        className += ' team3';
      } else if (eventInfo.events.includes('佐藤・永山')) {
        className += ' team4';
      } else if (eventInfo.events.includes('市橋・中西')) {
        className += ' team5';  
      } else if (eventInfo.events.includes('冨木田・岡谷')){
        className += ' team6';
      } else if (eventInfo.events.includes('日')){
        className += ' holiday';
      } else if (eventInfo.events.includes('年末年始')){
        className += ' newyear';
      }
    }

    return (
      <div className={className}>
        {eventInfo && eventInfo.events.map((event, index) => (
          <div key={index} className="event-item">{event}</div>
        ))}
      </div>
    );
  };
  return (
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default CalendarComponent;