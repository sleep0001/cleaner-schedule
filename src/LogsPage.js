import React, { useEffect, useState } from "react";
import './LogsPage.css';
import axios from 'axios';
import { Timeline } from "antd";

const LogsPage = () => {
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://9uhunbcmd3.execute-api.ap-northeast-1.amazonaws.com/items');
        const sortedLogs = [...response.data].sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
        setLogsData(sortedLogs);
        console.log(sortedLogs);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="logspage">
      <Timeline
        className="custom-timeline"
        items={logsData.map((log, index) => {
          const timestamp = new Date(log.Timestamp).toLocaleString();

          return {
            key: index, // keyはオブジェクト内のプロパティとしてではなく、Timelineのキーとして提供する
            color: index % 2 === 0 ? 'green' : 'blue',
            children: (
              <div className="custom-timeline-item">
                <strong>{timestamp}</strong>
                <div>
                  {log.date1}: <strong>{log.people2.join(', ')}</strong> to <strong>{log.people1.join(', ')}</strong>
                </div>
                <div>
                  {log.date2}: <strong>{log.people1.join(', ')}</strong> to <strong>{log.people2.join(', ')}</strong>
                </div>
              </div>
            )
          };
        })}
      />
    </div>
  );
}

export default LogsPage;