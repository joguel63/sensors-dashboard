import { Grid2 as Grid } from "@mui/material";
import { DashboardLayout, SensorCard, SensorHistoryChart } from "../components";
import { useFirebaseContext } from "../hooks";

export const DashboardPage: React.FC = () => {
  const { data } = useFirebaseContext();

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SensorCard label="Temperatura" value={data?.temperature ?? 0} unit="°C" />
          <SensorHistoryChart sensorType="temperature" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SensorCard label="Humedad" value={data?.humidity ?? 0} unit="%" />
          <SensorHistoryChart sensorType="humidity" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SensorCard label="Presión" value={data?.pressure ?? 0} unit="hPa" />
          <SensorHistoryChart sensorType="pressure" />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
