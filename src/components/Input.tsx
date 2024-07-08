import { InputHTMLAttributes, ReactNode } from "react";
import useTheme from "../hooks/useTheme";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function Input({ startIcon, endIcon, ...props }: CustomInputProps) {
  const theme = useTheme()?.theme;
  const isLight = theme === "Light";

  return (
    <div
      className={`w-full rounded-md bg-[hsl(0,0%,100%)] py-3 shadow-md sm:w-2/3 md:w-1/2 lg:w-1/3 ${isLight ? "bg-element-light" : "bg-element-dark"} ${endIcon ? "pl-3 pr-7" : "pl-7 pr-3"}`}
    >
      <div className="flex h-full w-full items-center gap-6 rounded-[inherit] bg-inherit">
        {startIcon}
        <input
          {...props}
          className={`h-full w-full rounded-[inherit] bg-inherit focus:outline-0 active:outline-0 ${isLight ? "focus:text-light active:text-light" : "focus:text-darker active:text-darker"}`}
          placeholder="Search for a country..."
        />
        {endIcon}
      </div>
    </div>
  );
}

export default Input;
