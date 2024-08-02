import React, { useEffect, useState } from 'react';
import { Calendar, Modal, Switch } from 'antd';
import './CalendarComponent.css'; // スタイルシートのインポート
import axios from 'axios';

const CalendarComponent = () => {
    const [isOn, setIsOn] = useState(false);
    const [selectedDate, setSelectedDate] = useState({});
    const [currentMonth, setCurrentMonth] = useState(null);
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

    const getClassName = (eventInfo) => {
        if (!eventInfo || !eventInfo.people) return 'ant-picker-calendar-date-content';

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
        if (isOn && selectedDate.hasOwnProperty(eventInfo.date)) {
            return 'ant-picker-calendar-date-content select-date';
        }

        for (const [key, value] of Object.entries(classNames)) {
            if (eventInfo.people.includes(key)) return `ant-picker-calendar-date-content ${value}`;
        }

        return 'ant-picker-calendar-date-content holiday';
    };

    const cellRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        const eventInfo = data.find(event => event.date === date);

        const className = getClassName(eventInfo);

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

    const onSelect = (value) => {
      console.log('onselect');
  
      // 交換モードでないなら何もせずにreturn
      if (!isOn) {
        console.log(selectedDate);
        return;
      }
  
      const date = value.format('YYYY-MM-DD');
      const eventInfo = data.find(event => event.date === date);
  
      // 現在の月と選択された日付の月が一致しない場合は処理をスキップ
      if (currentMonth && value.format('YYYY-MM') !== currentMonth.format('YYYY-MM')) {
        return;
      }
      
  
      const newSelected = {...selectedDate};
      if (newSelected.hasOwnProperty(eventInfo.date)) {
        delete newSelected[eventInfo.date];
      } else if (Object.keys(newSelected).length < 2) {
        newSelected[eventInfo.date] = eventInfo.people;
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
      if (isOn) {
        console.log('トグルがオフにされた');
        setSelectedDate({});
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
