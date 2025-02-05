import { useContext } from "react";
import { FirebaseContext } from "../contexts";

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebaseContext debe ser usado dentro de un FirebaseProvider");
  }

  return context;
};
