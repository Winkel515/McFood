import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api.github.com/repos/axios/axios');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-between flex-wrap bg-gradient-to-b from-mcBlue to-white bg-fixed">
      <h1>Analytics</h1>
    </div>
  );
}
