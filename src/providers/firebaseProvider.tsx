import { Box, CircularProgress } from "@mui/material";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirebaseContext } from "../contexts";
import { auth, db, dbFirebase, provider } from "../utils/firebaseConnection.utils";

type SensorData = {
  temperature: number;
  humidity: number;
  pressure: number;
};

const saveToFirestore = async (sensorValues: SensorData) => {
  try {
    await addDoc(collection(dbFirebase, "sensor_history"), {
      ...sensorValues,
      timestamp: new Date(),
    });
    console.log("Historial guardado en Firestore");
  } catch (error) {
    console.error("Error guardando historial en Firestore", error);
  }
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<SensorData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateTimes, setUpdateTimes] = useState(0);

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
  }, []);

  useEffect(() => {
    if (!user) return;

    // Escuchar cambios en la base de datos en tiempo real
    const sensorRef = ref(db, "sensors");
    onValue(sensorRef, async (snapshot) => {
      const sensorData = snapshot.val();
      if (sensorData) {
        setData(sensorData);
      }
    });
  }, [user]);

  useEffect(() => {
    if (!data) return;

    saveToFirestore(data);
    setUpdateTimes((prev) => prev + 1);
  }, [data]);

  if (!isLoaded)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );

  return (
    <FirebaseContext.Provider value={{ user, login, logout, data, updateTimes }}>
      {children}
    </FirebaseContext.Provider>
  );
};
