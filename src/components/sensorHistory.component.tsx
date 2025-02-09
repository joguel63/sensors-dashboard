import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { useSensorHistory } from "../hooks";
import "chart.js/auto";
import { useMemo } from "react";

export const SensorHistoryChart: React.FC<{ sensorType: string }> = ({ sensorType }) => {
  const history = useSensorHistory(sensorType);

  const name = useMemo(() => {
    switch (sensorType) {
      case "temperature":
        return "Temperatura";
      case "humidity":
        return "Humedad";
      case "pressure":
        return "Presión";
      default:
        return "Desconocido";
    }
  }, [sensorType]);

  console.log(history, name);

  const sortTimestamps = (history: { timestamp: string; value: number }[]) => {
    const timestamps = history.map(({ timestamp }) => timestamp);
    return timestamps.sort((a, b) => (a > b ? 1 : -1));
  };

  const chartData = {
    labels: sortTimestamps(history),
    datasets: [
      {
        label: `${name.toUpperCase()} en el tiempo`,
        data: history.map((d) => d.value),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">{name.toUpperCase()} - Últimos registros</Typography>
        <Line data={chartData} />
      </CardContent>
    </Card>
  );
};
