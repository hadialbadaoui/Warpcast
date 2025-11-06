// src/App.tsx (simplified)
import { useState } from "react";
import WelcomeScreen from "./pages/WelcomeScreen";
import HomeScreen from "./pages/HomeScreen";

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);

  if (!hasAccess) return <WelcomeScreen onProceed={() => setHasAccess(true)} />;
  return <HomeScreen />;
}
