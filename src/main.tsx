import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CreditProvider } from "./context/CreditContext.tsx";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <CreditProvider>
    <App />
  </CreditProvider>

);
