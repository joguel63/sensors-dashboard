import { Card, CardContent, Typography, useTheme } from "@mui/material";

interface SensorCardProps {
  label: string;
  value: number;
  unit: "°C" | "%" | "hPa";
}

export const SensorCard: React.FC<SensorCardProps> = ({ label, value, unit }) => {
  const theme = useTheme();

  const getColor = () => {
    switch (unit) {
      case "°C":
        if (value > 40) return theme.palette.error.main;
        if (value > 25) return theme.palette.warning.main;
        return theme.palette.success.main;
      case "%":
        if (value > 80) return theme.palette.error.main;
        if (value > 50) return theme.palette.warning.main;
        return theme.palette.success.main;
      case "hPa":
        if (value < 990 || value > 1025) return theme.palette.error.main;
        if (value < 1000 || value > 1015) return theme.palette.warning.main;
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatValue = () => {
    return new Intl.NumberFormat("es-ES", {
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card sx={{ textAlign: "center", bgcolor: getColor(), color: theme.palette.common.white }}>
      <CardContent>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="h4">
          {formatValue()} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};
