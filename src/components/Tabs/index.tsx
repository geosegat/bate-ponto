const Tabs = ({
  abaAtiva,
  setAbaAtiva,
}: {
  abaAtiva: "hoje" | "historico";
  setAbaAtiva: (aba: "hoje" | "historico") => void;
}) => {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        onClick={() => setAbaAtiva("hoje")}
        className={`flex-1 py-2 text-center font-medium ${
          abaAtiva === "hoje"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500"
        }`}
      >
        Hoje
      </button>
      <button
        onClick={() => setAbaAtiva("historico")}
        className={`flex-1 py-2 text-center font-medium ${
          abaAtiva === "historico"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500"
        }`}
      >
        Histórico
      </button>
    </div>
  );
};

export default Tabs;
