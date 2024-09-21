import React, { useState, useEffect } from 'react';
import { Calendar, Switch, Button, Tooltip, message , Modal} from 'antd';
import axios from 'axios';
import './CalendarComponent.css'; // スタイルシートのインポート

const CalendarComponent = () => {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [currentMonth, setCurrentMonth] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態を管理
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
      '内山': 'team2',
      '山崎': 'team3',
      '岡野': 'team4',
      '佐藤': 'team5',
      '市橋': 'team6',
      '冨木田': 'team7',
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
    console.log('onSelect');

    // 交換モードでないなら何もせずにreturn
    if (!isChangeMode) {
      console.log(selectedDate);
      return;
    }

    const date = value.format('YYYY-MM-DD');

    // 選択された日付が予定を持たない、または休日の場合はスキップ
    const eventInfo = data.find(event => event.date === date);
    if (!eventInfo || eventInfo.events === 'true') {
      console.log(selectedDate);
      return;
    }

    // 現在の月と選択された日付の月が一致しない場合は処理をスキップ
    if (currentMonth && value.format('YYYY-MM') !== currentMonth.format('YYYY-MM')) {
      return;
    }

    const newSelected = { ...selectedDate };

    // 選択された日付がすでに選択されていれば削除、されていなければ追加
    if (newSelected[date]) {
      delete newSelected[date];
    } else if (Object.keys(newSelected).length < 2) {
      newSelected[date] = eventInfo.people;
    } else {
      console.log(newSelected);
      return;
    }

    setSelectedDate(newSelected);
    setDisabled(Object.keys(newSelected).length !== 2);
    // TODO: 文言はラベルとして定数にしておくべき(忘れてた)
    setTooltipText(Object.keys(newSelected).length !== 2 ? '日付をふたつ選んでください' : '');
    console.log(newSelected);
  };

  const onPanelChange = (value) => {
    setCurrentMonth(value);
  };

  const toggleSwitch = (checked) => {
    setIsChangeMode(checked); // トグルボタンの状態を更新
    if (!checked) {
      setSelectedDate({}); // トグルオフ時に選択した日付をリセット
      setDisabled(true);
      setTooltipText('交換するには左のボタンをオンにしてください');
    } else {
      setTooltipText('日付をふたつ選んでください');
    }
  }

  // FIXME: ボタンコンポーネントに移動するべき
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
      // 新しいデータを反映する
      const updatedData = data.map(event => {
        if (event.date === keys[0]) {
          return { ...event, people: secondDateGroup };
        }
        if (event.date === keys[1]) {
          return { ...event, people: firstDateGroup };
        }
        return event;
      });
      message.success('SUCCESS', 3);
      setData(updatedData);
    } catch (error) {
      console.log('Error:', error);
      setIsChangeMode(false);
      message.error('エラー！交換できませんでした。', 3);
    };
    setIsModalOpen(false); // モーダルを閉じる
    setIsChangeMode(false);
    setDisabled(true);
    setTooltipText('交換するには左のボタンをオンにしてください');
    setSelectedDate({});
  };
    
  const handleCancel = () => {
    setIsModalOpen(false); // モーダルを閉じる
  };
  
  const detectSmartPhone = () => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true;
    }
    return false;
  }

  const isSmartPhone = detectSmartPhone();

  return (
    <>
      <Switch
        checked={isChangeMode}
        onChange={toggleSwitch}
        style={{
          margin: 16,
        }}
      />
      <Tooltip placement='right' title={tooltipText} trigger={isSmartPhone ? 'click' : 'hover'}>
        <Button type="primary" disabled={disabled} onClick={handleClick} >CHANGE</Button>
      </Tooltip>
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
