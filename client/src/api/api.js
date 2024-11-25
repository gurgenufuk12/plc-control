import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const fetchLidarData = async () => {
  const response = await axios.get(`${API_URL}/lidar`);
  return response.data.lidar;
};

export const triggerEmergencyStop = async () => {
  await axios.post(`${API_URL}/emergency-stop`);
};
