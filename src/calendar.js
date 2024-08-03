import React, { useState } from 'react';
import { Calendar, Modal, Switch } from 'antd';
import eventsData from './schedule.json'; // ファイルのインポート
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [events] = useState(eventsData); // useStateを使ってデータを取得
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [currentMonth, setCurrentMonth] = useState(null);

  const getClassName = (eventInfo) => {
    if (!eventInfo || !eventInfo.events) return 'ant-picker-calendar-date-content';

    const classNames = {
      '野際': 'team1',
      '山崎': 'team2',
      '岡野': 'team3',
      '佐藤': 'team4',
      '市橋': 'team5',
      '冨木田': 'team6',
      '年末年始': 'newyear'
    };

    // 交換モードがオンで選択中の日付なら、背景色真っ赤を適用
    if (isChangeMode && selectedDate.hasOwnProperty(eventInfo.date)) {
      return 'ant-picker-calendar-date-content select-date';
    }

    for (const [key, value] of Object.entries(classNames)) {
      if (eventInfo.events.includes(key)) return `ant-picker-calendar-date-content ${value}`;
    }

    return 'ant-picker-calendar-date-content holiday';
  };

  const cellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);

    const className = getClassName(eventInfo);

    return (
      <div className={className}>
        {eventInfo?.events?.map((event, index) => (
          <div key={index} className="event-item">{event}</div>
        ))}
      </div>
    );
  };

  const onSelect = (value) => {
    console.log('onselect');

    // 交換モードでないなら何もせずにreturn
    if (!isChangeMode) {
      console.log(selectedDate);
      return;
    }

    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);

    // 現在の月と選択された日付の月が一致しない場合は処理をスキップ
    if (currentMonth && value.format('YYYY-MM') !== currentMonth.format('YYYY-MM')) {
      return;
    }
    

    const newSelected = {...selectedDate};
    if (newSelected.hasOwnProperty(eventInfo.date)) {
      delete newSelected[eventInfo.date];
    } else if (Object.keys(newSelected).length < 2) {
      newSelected[eventInfo.date] = eventInfo.events;
    } else {
      console.log(newSelected);
      return;
    }
    setSelectedDate(newSelected);
    console.log(newSelected);
  };

  const onPanelChange = (value) => {
    setCurrentMonth(value);
  };

  const toggleSwitch = () => {
    if (isChangeMode) {
      console.log('トグルがオフにされた');
      setSelectedDate({});
    } else {
      console.log('トグルがオンにされた');
    }
    setIsChangeMode(!isChangeMode);

  }

  return (
    <>
      <Switch
        onClick={toggleSwitch}
        style={{
          margin: 16,
        }}
      />
      <Calendar cellRender={cellRender} onSelect={onSelect} onPanelChange={onPanelChange}/>
    </>
  );
};

export default CalendarComponent;