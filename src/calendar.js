import React, { useState } from 'react';
import { Calendar, Modal } from 'antd';
import eventsData from './schedule.json'; // ファイルのインポート
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [events] = useState(eventsData); // useStateを使ってデータを取得
  const [selectedDate, setSelectedDate] = useState(null); // 選択された日付を保持
  const [isModalVisible, setIsModalVisible] = useState(false); // モーダルの表示状態を保持

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
    const date = value.format('YYYY-MM-DD');
    const eventInfo = events.find(event => event.date === date);
    setSelectedDate(eventInfo);
    setIsModalVisible(true); // モーダルを表示
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // モーダルを閉じる
  };

  return (
    <>
      <Calendar cellRender={cellRender} onSelect={onSelect} />
      <Modal
        title="Selected Date Events"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        {selectedDate ? (
          selectedDate.events.map((event, index) => (
            <div key={index}>{event}</div>
          ))
        ) : (
          <div>No events</div>
        )}
      </Modal>
    </>
  );
};

export default CalendarComponent;