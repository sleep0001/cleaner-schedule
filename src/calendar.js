import React, { useState } from 'react';
import { Calendar } from 'antd';
import eventsData from './schedule.json'; // ファイルのインポート
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [events] = useState(eventsData); // useStateを使ってデータを取得

  const cellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);
    
    let className = 'ant-picker-calendar-date-content';

    if (eventInfo && eventInfo.events && Array.isArray(eventInfo.events)) {
      // 予定の種類に応じてクラスを追加      
      if (eventInfo.events.includes('野際')) {
        className += ' team1';
      } else if (eventInfo.events.includes('山崎')) {
        className += ' team2';
      } else if (eventInfo.events.includes('岡野')) {
        className += ' team3';
      } else if (eventInfo.events.includes('佐藤')) {
        className += ' team4';
      } else if (eventInfo.events.includes('市橋')) {
        className += ' team5';  
      } else if (eventInfo.events.includes('冨木田')){
        className += ' team6';
      } else if (eventInfo.events.includes('年末年始')){
        className += ' newyear';
      } else {
        className += ' holiday';
      }
    }

    return (
      <div className={className}>
        {/* eventInfo.eventsが存在する場合のみmapメソッドを使用 */}
        {eventInfo && eventInfo.events && eventInfo.events.map((event, index) => (
          <div key={index} className="event-item">{event}</div>
        ))}
      </div>
    );
  };

  return (
    <Calendar cellRender={cellRender} />
  );
};

export default CalendarComponent;
