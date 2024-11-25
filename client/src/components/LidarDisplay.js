import React, { useState, useEffect } from "react";
import { fetchLidarData } from "../api/api";

const LidarDisplay = () => {
  const [lidarData, setLidarData] = useState([]);

  useEffect(() => {sdfadsfds
    const fetchData = async () => {
      try {
        const data = await fetchLidarData();
        setLidarData(data);
      } catch (error) {
        console.error("Error fetching lidar data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lidar Data</h1>
      <pre>{JSON.stringify(lidarData, null, 2)}</pre>
    </div>
  );
};

export default LidarDisplay;
