import React, { useState } from 'react';
import { Calendar, Modal, Switch } from 'antd';
import eventsData from './schedule.json'; // ファイルのインポート
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [events] = useState(eventsData); // useStateを使ってデータを取得
  const [isOn, setIsOn] = useState(false);
  const [selectDateFirst, setSelectDateFirst] = useState(null);
  const [selectDateSecond, setSelectDateSecond] = useState(null);
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
    if (isOn) {
      if (selectDateFirst != null && eventInfo.date === selectDateFirst.date) {
        return 'ant-picker-calendar-date-content select-date';
      }
      if (selectDateSecond != null && eventInfo.date === selectDateSecond.date) {
        return 'ant-picker-calendar-date-content select-date';
      }
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
    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);

    // 現在の月と選択された日付の月が一致しない場合は処理をスキップ
    if (currentMonth && value.format('YYYY-MM') !== currentMonth.format('YYYY-MM')) {
      return;
    }
    

    if (isOn) {
      // 交換モードオンの時
      if (selectDateFirst === null) {
        // 一つ目の日付がない場合
        setSelectDateFirst(eventInfo);
      } else {
        // 一つ目の日付がある場合
        if (selectDateSecond === null) {
          // 二つ目の日付がない場合
          setSelectDateSecond(eventInfo);
        } else {
          // 二つ目の日付がある場合、firstをsecondに移す、firstに新しく格納
          setSelectDateFirst(selectDateSecond);
          setSelectDateSecond(eventInfo);
        }
      }
    }
    console.log('first', selectDateFirst);
    console.log('second', selectDateSecond);
  };

  const onPanelChange = (value) => {
    setCurrentMonth(value);
  };

  const toggleSwitch = () => {
    if (isOn) {
      console.log('トグルがオフにされた');
    } else {
      console.log('トグルがオンにされた');
    }
    setIsOn(!isOn);

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