import { Dispatch, SetStateAction } from "react";
import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
}

const DarkModeToggle = ({
  isDarkTheme,
  setIsDarkTheme,
}: DarkModeToggleProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className="w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer"
      >
        <div
          className={`w-6 h-6 rounded-full bg-white dark:bg-gray-200 shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isDarkTheme ? "translate-x-8" : "translate-x-0"
          }`}
        >
          {isDarkTheme ? (
            <Moon size={16} className="text-gray-700" />
          ) : (
            <Sun size={16} className="text-yellow-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
