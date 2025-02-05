import { Grid2 as Grid } from "@mui/material";
import { DashboardLayout, SensorCard } from "../components";
import { useFirebaseContext } from "../hooks";

export const DashboardPage: React.FC = () => {
  const { data } = useFirebaseContext();
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SensorCard label="Temperatura" value={data?.temperature ?? 0} unit="°C" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SensorCard label="Humedad" value={data?.humidity ?? 0} unit="%" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SensorCard label="Presión" value={data?.pressure ?? 0} unit="hPa" />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
