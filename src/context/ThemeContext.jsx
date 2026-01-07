import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => setDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
