import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = function () {
  const context = useContext(ThemeContext);

  if (context === undefined)
    console.log("ThemeContext was used outside ThemeProvider");

  return context;
};

export default useTheme;
