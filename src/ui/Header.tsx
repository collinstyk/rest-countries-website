import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import Button from "../components/Button";

import useTheme from "../hooks/useTheme";

function Header() {
  const themeContext = useTheme();
  const theme = themeContext?.theme;
  const toggleTheme = themeContext?.toggleTheme;

  const isLight = theme === "Light";

  return (
    <div
      className={`flex items-center justify-between bg-[hsl(0,0%,100%)] px-3 py-4 shadow-lg sm:px-8 ${isLight ? "bg-element-light" : "bg-element-dark"}`}
    >
      <h1
        className={`text-base font-bold ${isLight ? "text-light" : "text-dark"}`}
      >
        Where in the world?
      </h1>
      <Button
        size="md"
        text={isLight ? "light" : "dark"}
        className="pr-0"
        onClick={toggleTheme}
      >
        {isLight && <IoMoonSharp fill="hsl(200,15%,8%)" className="m-auto" />}
        {!isLight && <IoSunnySharp fill="white" className="m-auto" />}
        {isLight ? "Dark mode" : "Light mode"}
      </Button>
    </div>
  );
}

export default Header;
