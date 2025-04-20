import React from "react";
import TrilletCall from "./components/TrilletCall";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <TrilletCall />
      </main>
      <Footer />
    </div>
  );
};

export default App;
