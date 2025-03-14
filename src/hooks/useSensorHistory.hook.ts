import { format } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbFirebase } from "../utils/firebaseConnection.utils";
import { useFirebaseContext } from "./useFirebaseContext.hook";

export const useSensorHistory = (sensorType: string) => {
  const [history, setHistory] = useState<{ timestamp: string; value: number }[]>([]);
  const { updateTimes } = useFirebaseContext();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(collection(dbFirebase, "sensor_history"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          timestamp: format(doc.data().timestamp.toDate(), "dd/MM/yyyy hh:mm:ss a"),
          value: doc.data()[sensorType],
        }));
        setHistory(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching sensor history:", error);
      }
    };
    fetchHistory();
  }, [sensorType, updateTimes]);

  return history;
};
