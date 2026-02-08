import "./App.css";
import { siteConfig } from "./data/siteConfig";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Highlights from "./components/Highlights/Highlights";
import About from "./components/About/About";
import Gallery from "./components/Gallery/Gallery";

function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", siteConfig.colors.primary);
    root.style.setProperty("--secondary", siteConfig.colors.secondary);
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <Highlights />
      <About />
      <Gallery />
    </>
  );
}

export default App;
