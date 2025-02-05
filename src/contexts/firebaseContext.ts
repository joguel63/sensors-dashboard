import { User } from "firebase/auth";
import { createContext } from "react";

type FirebaseContextProps = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  data: { temperature: number; humidity: number; pressure: number } | null;
};

export const FirebaseContext = createContext<FirebaseContextProps>({
  user: null,
  login: async () => {},
  logout: async () => {},
  data: null,
});
