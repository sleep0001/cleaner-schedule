import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import './CalendarComponent.css'; // スタイルシートのインポート
import axios from 'axios';

const CalendarComponent = () => {

  // DynamoDBへのアクセス
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // データ取得中の状態を管理

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://d0ns4u2oaj.execute-api.ap-northeast-1.amazonaws.com/items');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false); // データ取得完了後にローディング状態を解除
      }
    };
    fetchData();
  }, []);

  const cellRender = (value) => {
    const target_date = value.format('YYYY-MM-DD');
    const eventInfo = data.find(response => response.date === target_date);
    
    let className = 'ant-picker-calendar-date-content';

    if (eventInfo && eventInfo.people && Array.isArray(eventInfo.people)) {
      // 予定の種類に応じてクラスを追加      
      if (eventInfo.people.includes('野際')) {
        className += ' team1';
      } else if (eventInfo.people.includes('山崎')) {
        className += ' team2';
      } else if (eventInfo.people.includes('岡野')) {
        className += ' team3';
      } else if (eventInfo.people.includes('佐藤')) {
        className += ' team4';
      } else if (eventInfo.people.includes('市橋')) {
        className += ' team5';  
      } else if (eventInfo.people.includes('冨木田')){
        className += ' team6';
      } else if (eventInfo.people.includes('年末年始')){
        className += ' newyear';
      } else {
        className += ' holiday';
      }
    }
    return (
      <div className={className}>
        {/* eventInfo.dataが存在する場合のみmapメソッドを使用 */}
        {eventInfo && eventInfo.people && eventInfo.people.length > 0 && eventInfo.people.map((person, index) => (
          <div key={index} className="event-item">{person}</div>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>; // データ取得中はローディングメッセージを表示
  }

  return (
    <Calendar cellRender={cellRender} />
  );
};

export default CalendarComponent;
