import React, { useState } from 'react';
import { Calendar } from 'antd';
import eventsData from './schedule.json'; // ファイルのインポート

const CalendarComponent = () => {
  const [events] = useState(eventsData); // useStateを使ってデータを取得

  const dateCellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);

    if (eventInfo) {
      return (
        <ul>
          {eventInfo.events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default CalendarComponent;