import React from "react";

interface ApiFormProps {
  apiUrl: string;
  setApiUrl: (url: string) => void;
  isDarkTheme?: boolean;
}

const ApiForm: React.FC<ApiFormProps> = ({
  apiUrl,
  setApiUrl,
  isDarkTheme,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="apiUrl"
        className={`block text-sm font-medium mb-1 ${
          isDarkTheme ? "text-gray-200" : "text-gray-700"
        }`}
      >
        URL da API:
      </label>
      <input
        type="text"
        id="apiUrl"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="https://exemplo.com/api/ponto"
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isDarkTheme
            ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400"
            : "border-gray-300 bg-white text-black placeholder-gray-500"
        }`}
      />
    </div>
  );
};

export default ApiForm;
