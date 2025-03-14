import { useDateTimeFormat } from "../../hooks/useDateTimeFormat";

type HistoricoItem = {
  data: string;
  batidas: string[];
};

const HistoryTable = ({ historico }: { historico: HistoricoItem[] }) => {
  const { formatDate, formatTime } = useDateTimeFormat();

  if (historico.length === 0) {
    return <p className="text-gray-600">Nenhum registro no histórico</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Data
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Entrada
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Saída Almoço
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Retorno
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Saída
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {historico.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-sm text-gray-700">
                {formatDate(item.data)}
              </td>
              {[0, 1, 2, 3].map((i) => (
                <td key={i} className="px-4 py-2 text-sm text-gray-700">
                  {item.batidas[i] ? formatTime(item.batidas[i]) : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
