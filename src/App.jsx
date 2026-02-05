import "./App.css";
import { siteConfig } from "./data/siteConfig";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", siteConfig.colors.primary);
    root.style.setProperty("--secondary", siteConfig.colors.secondary);
  }, []);

  return (
    <>
      <h1>{siteConfig.name}</h1>
    </>
  );
}

export default App;
