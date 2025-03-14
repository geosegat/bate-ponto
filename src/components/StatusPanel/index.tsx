import React from "react";

interface StatusPanelProps {
  nextPonto: string;
  isDarkTheme?: boolean;
}

const StatusPanel: React.FC<StatusPanelProps> = ({
  nextPonto,
  isDarkTheme = false,
}) => {
  return (
    <div
      className={`border-l-4 p-3 rounded-md mb-4 ${
        isDarkTheme
          ? "bg-blue-900 border-blue-700 text-white"
          : "bg-blue-100 border-blue-500"
      }`}
    >
      <strong>Próximo registro: {nextPonto}</strong>
    </div>
  );
};

export default StatusPanel;
