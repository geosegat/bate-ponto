const ApiForm = ({
  apiUrl,
  setApiUrl,
}: {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="apiUrl"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        URL da API:
      </label>
      <input
        type="text"
        id="apiUrl"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="https://exemplo.com/api/ponto"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ApiForm;
