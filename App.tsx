import React from "react";
import { AppProvider } from "./context/AppContext";
import Navigation from "./navigation/Navigation";

/**
 * The App component serves as the root of the application.
 * It wraps the entire application with the AppProvider context
 * to manage global state and includes the Navigation component
 * for handling navigation throughout the app.
 */
export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
