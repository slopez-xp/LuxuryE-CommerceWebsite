
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { AuthProvider } from "./context/AuthContext.tsx";
  import { StoreProvider } from "./context/StoreContext.tsx";
  
  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  );
    