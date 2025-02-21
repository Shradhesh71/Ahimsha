"use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <NextThemesProvider attribute="class" defaultTheme="dark">
//       {children}
//     </NextThemesProvider>
//   );
// }

import React, { createContext, useContext, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute: string;
  defaultTheme: string;
}

const ThemeContext = createContext({});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  attribute,
  defaultTheme,
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={attribute}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
