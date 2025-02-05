import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useFirebaseContext } from "../hooks";

export function LoginPage() {
  const { login } = useFirebaseContext();

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Card sx={{ width: "100%", textAlign: "center", padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Bienvenid@
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Inicia sesión con Google para acceder al panel de sensores.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={login}
              sx={{ textTransform: "none", fontSize: "16px", padding: "10px 20px" }}
            >
              Iniciar sesión con Google
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
