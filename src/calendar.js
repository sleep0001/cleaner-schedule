import React, { useState, useEffect } from 'react';
import { Calendar, Switch, Button, message , Modal} from 'antd';
import axios from 'axios';
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [currentMonth, setCurrentMonth] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態を管理


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
    console.log(newSelected);
  };

  const onPanelChange = (value) => {
    setCurrentMonth(value);
  };

  const toggleSwitch = (checked) => {
    setIsChangeMode(checked); // トグルボタンの状態を更新
    if (!checked) {
      setSelectedDate({}); // トグルオフ時に選択した日付をリセット
    }
  }

  const handleClick = async () => {
    const newSelected = { ...selectedDate };
    // 選択日が2つあるなら交換、そうでないならフラッシュメッセージを残す。（一旦何も起きずにスキップで）
    if (Object.keys(newSelected).length === 2) {
      setIsModalOpen(true); // モーダルを表示
    } else {
      message.warning('2つの日付を選択してください。');
    }
  };

  const handleOk = async () => {
    

  
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
        setIsChangeMode(false);
        setIsModalOpen(false); // モーダルを閉じる
        // 成功後にページをリロード
        message.success('SUCCESS!!', 3);
        setTimeout(() => {
          window.location.reload(true);
        }, 3000); // 3秒後にリロードを実行
      } catch (error) {
        console.log('Error:', error);
        setIsChangeMode(false);
        setIsModalOpen(false); // モーダルを閉じる
        message.error('エラー！交換できませんでした。', 3);
      };
    };
    
    const handleCancel = () => {
      setIsChangeMode(false);
      setSelectedDate({}); // トグルオフ時に選択した日付をリセット
      setIsModalOpen(false); // モーダルを閉じる
    };

  return (
    <>
      <Switch
        checked={isChangeMode}
        onChange={toggleSwitch}
        style={{
          margin: 16,
        }}
      />
      <Button type="primary" onClick={handleClick} href="#">CHANGE</Button>
      <Calendar cellRender={cellRender} onSelect={onSelect} onPanelChange={onPanelChange} />
      <Modal
        title="Proceed with Swap?"
        open={isModalOpen} // `visible`を`open`に変更
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="キャンセル"
      >
        <p>選択した日付を入れ替えますか？</p>
        {Object.keys(selectedDate).map((date, index) => (
          <div key={index}>
            <strong>{date}:</strong>{selectedDate[date].join(', ')}
          </div>
        ))}
      </Modal>
    </>
  );
};

export default CalendarComponent;