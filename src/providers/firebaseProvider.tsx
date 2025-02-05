import { signInWithPopup, signOut, User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FirebaseContext } from "../contexts";
import { auth, db, provider } from "../utils/firebaseConnection.utils";
import { CircularProgress, Box } from "@mui/material";

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<{
    temperature: number;
    humidity: number;
    pressure: number;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const login = async () => {
    await signInWithPopup(auth, provider).catch((error) =>
      console.error("Error al iniciar", error)
    );
  };

  const logout = async () => {
    await signOut(auth).catch((error) => console.error("Error al cerrar sesión", error));
  };

  useEffect(() => {
    // Observar cambios de usuario
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoaded(true);
    });

    // Escuchar cambios en la base de datos en tiempo real
    const sensorRef = ref(db, "sensors");
    onValue(sensorRef, (snapshot) => {
      const sensorData = snapshot.val();
      if (sensorData) {
        setData(sensorData);
      }
    });
  }, []);

  if (!isLoaded)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );

  return (
    <FirebaseContext.Provider value={{ user, login, logout, data }}>
      {children}
    </FirebaseContext.Provider>
  );
};
