import React, { useEffect, useState } from "react";
import './LogsPage.css';
import axios from 'axios';
import Loader from './Loader';
import { Timeline } from "antd";
import { NULL_IMAGE, LOG_IMAGE } from "./Constants";

const LogsPage = () => {
  const [logsData, setLogsData] = useState([]);

  const [loading, setLoading] = useState({isLoading: false, imageFile: NULL_IMAGE});

  useEffect(() => {
    const fetchData = async () => {
      let delay;
      try {
        setLoading({isLoading: true, imageFile: LOG_IMAGE});
        // 3秒待機するためのPromise 非同期処理
        delay = new Promise((resolve) => {
          setTimeout(resolve, 4000); // 3秒待機
        });
        const response = await axios.get('https://9uhunbcmd3.execute-api.ap-northeast-1.amazonaws.com/items');
        const sortedLogs = [...response.data].sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
        setLogsData(sortedLogs);
        console.log(sortedLogs);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        await delay;
        setLoading({isLoading: false, imageFile: NULL_IMAGE});
      }
    };
    fetchData();
  }, []);

  // タイムラインのアイテムを事前に作成
  const timelineItems = logsData.map((log, index) => {
    const timestamp = new Date(log.Timestamp).toLocaleString();

    return {
      key: index,
      color: index % 2 === 0 ? 'green' : 'blue',
      children: (
        <div className="custom-timeline-item">
          <strong>{timestamp}</strong>
          <div>
            {log.date1}: <strong>{log.people1.join(', ')}</strong> to <strong>{log.people2.join(', ')}</strong>
          </div>
          <div>
            {log.date2}: <strong>{log.people2.join(', ')}</strong> to <strong>{log.people1.join(', ')}</strong>
          </div>
        </div>
      )
    };
  });

  // タイムラインにアイテムを渡す
  return (
    <>
      {loading.isLoading && <Loader imageFile={loading.imageFile} />}
      <div className="logspage">
        <Timeline className="custom-timeline" items={timelineItems} />
      </div>
    </>
  );
}

export default LogsPage;