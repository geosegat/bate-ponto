interface BatidasListProps {
  batidas: string[];
  isDarkTheme?: boolean;
}

const getTipoPonto = (index: number, isDarkTheme: boolean) => {
  const tipoPontoMap = [
    {
      tipo: "Entrada",
      classe: isDarkTheme
        ? "bg-green-700 text-white"
        : "bg-green-500 text-white",
    },
    {
      tipo: "Saída Almoço",
      classe: isDarkTheme
        ? "bg-orange-700 text-white"
        : "bg-orange-500 text-white",
    },
    {
      tipo: "Retorno Almoço",
      classe: isDarkTheme ? "bg-blue-700 text-white" : "bg-blue-500 text-white",
    },
    {
      tipo: "Saída",
      classe: isDarkTheme ? "bg-red-700 text-white" : "bg-red-500 text-white",
    },
  ];

  return (
    tipoPontoMap[index - 1] || {
      tipo: "Registro Extra",
      classe: isDarkTheme
        ? "bg-purple-700 text-white"
        : "bg-purple-500 text-white",
    }
  );
};

const formatTime = (time: string) => {
  if (time.length === 4) {
    return `${time.substring(0, 2)}:${time.substring(2, 4)}`;
  }
  return time;
};

const BatidasList = ({ batidas, isDarkTheme = false }: BatidasListProps) => {
  if (batidas.length === 0) {
    return (
      <p className={isDarkTheme ? "text-gray-400" : "text-gray-600"}>
        Nenhum registro hoje
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {batidas.map((batida, index) => {
        const tipo = getTipoPonto(index + 1, isDarkTheme);
        return (
          <div
            key={index}
            className={`flex justify-between items-center p-3 ${
              isDarkTheme ? "bg-gray-800" : "bg-gray-50"
            } rounded-md`}
          >
            <div className="font-bold">{formatTime(batida)}</div>
            <div
              className={`px-2 py-1 rounded-md text-sm font-medium ${tipo.classe}`}
            >
              {tipo.tipo}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BatidasList;
