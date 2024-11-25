import React from "react";
import { triggerEmergencyStop } from "../api/api";

const EmergencyButton = () => {
  const handleStop = async () => {
    try {
      await triggerEmergencyStop();
      alert("Emergency stop triggered!");
    } catch (error) {
      console.error("Error triggering emergency stop:", error);
    }
  };

  return (
    <button
      onClick={handleStop}
      style={{ color: "white", backgroundColor: "red" }}
    >
      Emergency Stop
    </button>
  );
};

export default EmergencyButton;
