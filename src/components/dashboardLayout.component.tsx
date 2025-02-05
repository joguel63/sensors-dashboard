import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { ReactNode, useState, MouseEvent } from "react";
import { useFirebaseContext } from "../hooks";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { logout, user } = useFirebaseContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            Panel de Sensores
          </Typography>
          <Box>
            <IconButton onClick={handleClick} color="inherit">
              <Avatar src={user?.photoURL || ""} alt={user?.displayName || "Usuario"} />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {user?.displayName || "Usuario"}
              </Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
