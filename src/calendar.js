import React, { useState, useEffect } from 'react';
import { Calendar, Switch, Button, Tooltip } from 'antd';
import axios from 'axios';
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [currentMonth, setCurrentMonth] = useState(null);
  // FIXME: ほんとはボタンコンポーネントで判断するべき
  const [disabled, setDisabled] = useState(true);
  const [tooltipText, setTooltipText] = useState('交換するには左のボタンをオンにしてください');

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
    if (isChangeMode && selectedDate.hasOwnProperty(eventInfo.date)) {
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
  };

  const onSelect = (value) => {
    console.log('onselect');

    // 交換モードでないなら何もせずにreturn
    if (!isChangeMode) {
      console.log(selectedDate);
      return;
    }

    const date = value.format('YYYY-MM-DD');
    const eventInfo = data.find(event => event.date === date);

    // 休日は選択できない
    if (eventInfo.events === 'true') {
      console.log(selectedDate);
      return;
    }

    // 現在の月と選択された日付の月が一致しない場合は処理をスキップ
    if (currentMonth && value.format('YYYY-MM') !== currentMonth.format('YYYY-MM')) {
      return;
    }


    const newSelected = { ...selectedDate };
    if (newSelected.hasOwnProperty(eventInfo.date)) {
      delete newSelected[eventInfo.date];
    } else if (Object.keys(newSelected).length < 2) {
      newSelected[eventInfo.date] = eventInfo.people;
    } else {
      console.log(newSelected);
      return;
    }
    setSelectedDate(newSelected);
    setDisabled(Object.keys(newSelected).length !== 2);
    setTooltipText(Object.keys(newSelected).length !== 2 ? '日付をふたつ選んでください' : '');
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
    setTooltipText(isChangeMode ? '交換するには左のボタンをオンにしてください' : '日付をふたつ選んでください');
    setIsChangeMode(!isChangeMode);
  }

  // FIXME: ボタンコンポーネントに移動するべき
  const handleClick = async () => {
    const newSelected = { ...selectedDate };
    // 選択日が2つあるなら交換、そうでないならフラッシュメッセージを残す。（一旦何も起きずにスキップで）
    if (Object.keys(newSelected).length === 2) {
      const keys = Object.keys(selectedDate);
      const firstDateGroup = keys.length > 0 ? selectedDate[keys[0]] : null;
      const secondDateGroup = keys.length > 1 ? selectedDate[keys[1]] : null;
      const requestItems = {
        "changeRecords":[
          {
            "date": keys[0],
            "events": "false",
            "people": secondDateGroup
          },
          {
            "date": keys[1],
            "events": "false",
            "people": firstDateGroup
          }
        ],
        "logRecord": {
          "date1": keys[0],
          "date2": keys[1],
          "people1": firstDateGroup,
          "people2": secondDateGroup
        }
      }
      try {
        const requestRecord = await axios.put('https://c8u7xj98yh.execute-api.ap-northeast-1.amazonaws.com/items', requestItems);
        console.log('Success:', requestRecord);
        // 成功後にページをリロード
        window.location.reload(true);
      } catch (error) {
        console.log('Error:', error);
      };
    };
  };

  return (
    <>
      <span>交換モード</span>
      <Switch
        onClick={toggleSwitch}
        style={{
          margin: 16,
        }}
      />
      <Tooltip placement='right' title={tooltipText}>
        <Button type="primary" disabled={disabled} onClick={handleClick}>CHANGE</Button>
      </Tooltip>
      <Calendar cellRender={cellRender} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};

export default CalendarComponent;