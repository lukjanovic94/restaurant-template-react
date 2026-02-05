import "./App.css";
import { siteConfig } from "./data/siteConfig";
import { useEffect } from "react";
import Navigation from "./components/Navigation";

function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", siteConfig.colors.primary);
    root.style.setProperty("--secondary", siteConfig.colors.secondary);
  }, []);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
