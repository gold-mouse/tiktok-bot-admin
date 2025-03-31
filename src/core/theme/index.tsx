import React, { createContext, useMemo, useState, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Define context for theme toggling
interface ThemeContextProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Toggle function
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Create MUI theme based on dark mode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
