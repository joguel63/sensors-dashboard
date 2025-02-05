import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FirebaseProvider } from "./providers/firebaseProvider.tsx";

import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </BrowserRouter>
  </StrictMode>
);
