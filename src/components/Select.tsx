import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

function Select({
  options,
  onChange,
  defaultValue,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === defaultValue) || null,
  );

  const theme = useTheme()?.theme;
  const isLight = theme === "Light";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-52" ref={dropdownRef}>
      <div
        className={`flex cursor-pointer items-center justify-between rounded-md border-0 px-6 py-3 shadow-lg ${isLight ? "bg-element-light" : "bg-element-dark"}`}
        onClick={toggleDropdown}
      >
        <span className={`${isLight ? "text-light" : "text-dark"}`}>
          {selectedOption
            ? selectedOption.label
            : placeholder || "Select an option"}
        </span>
        <FaAngleDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
          fill={isLight ? "hsl(200,15%,8%)" : "hsl(0,0%,100%)"}
        />
      </div>
      {isOpen && (
        <div
          className={`border-0py-2 absolute z-10 mt-1 w-full rounded-md shadow-lg ${isLight ? "bg-element-light" : "bg-element-dark"}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-6 py-3 ${isLight ? "text-light" : "text-dark"}`}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
