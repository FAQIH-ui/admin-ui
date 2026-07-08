import React, { useContext } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DarkModeContext } from "../../context/DarkModeContext";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-06 dark:bg-special-bg3 text-gray-01 dark:text-white transition-colors mx-auto"
    >
      {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </button>
  );
}

export default DarkModeToggle;