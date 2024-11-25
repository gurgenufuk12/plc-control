const express = require("express");
const ModbusRTU = require("modbus-serial");

const app = express();
const PORT = 8000;

const client = new ModbusRTU();

const connectToPLC = async () => {
  try {
    await client.connectTCP("192.168.0.1", { port: 9100 });
    console.log("PLC'ye başarıyla bağlanıldı.");
  } catch (error) {
    console.error("PLC bağlantı hatası:", error.message);
    process.exit(1);
  }
};

const readLidarData = async () => {
  try {
    const data = await client.readInputRegisters(0, 10); // CHANGE IF NEEDED
    return data.data;
  } catch (error) {
    throw new Error("Lidar verisi okunamadı: " + error.message);
  }
};

const triggerEmergencyStop = async () => {
  try {
    await client.writeCoil(0, true); // CHANGE IF NEEDED
    console.log("Emergency stop triggered.");
  } catch (error) {
    throw new Error("Emergency stop hatası: " + error.message);
  }
};

app.get("/api/lidar", async (req, res) => {
  try {
    const data = await readLidarData();
    res.json({ lidar: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lidar verisi alınamadı.");
  }
});

app.post("/api/emergency-stop", async (req, res) => {
  try {
    await triggerEmergencyStop();
    res.status(200).send("Emergency stop triggered.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Emergency stop işleminde hata oluştu.");
  }
});

app.listen(PORT, async () => {
  console.log(`API sunucusu ${PORT} portunda çalışıyor.`);
  await connectToPLC();
});
