import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Theme is locked to dark mode (no light/dark toggle).
try {
  document.documentElement.classList.add("dark");
  document.documentElement.style.colorScheme = "dark";
  localStorage.removeItem("theme");
} catch {
  // no-op
}

createRoot(document.getElementById("root")!).render(<App />);
