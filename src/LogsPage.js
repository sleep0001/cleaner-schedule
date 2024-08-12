import React, { useEffect, useState } from "react";
import './LogsPage.css';
import axios from 'axios';

const LogsPage = () => {
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://9uhunbcmd3.execute-api.ap-northeast-1.amazonaws.com/items');
        setLogsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      logsData
    </div>
  )
}

export default LogsPage;