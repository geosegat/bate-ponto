import { useState, useEffect } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Clock from "./components/Clock";
import EmployeeInfo from "./components/EmployeeInfo";
import StatusPanel from "./components/StatusPanel";
import ApiForm from "./components/ApiForm";
import BatidasList from "./components/BatidasList";
import HistoryTable from "./components/HistoryTable";
import Tabs from "./components/Tabs";
import Modal from "./components/Modal";
import DarkModeToggle from "./components/DarkModeToggle";

import axios from "axios";
import { isValidApiResponse, mapApiResponseToBatidas } from "./hooks/datamaper";
import LogoutButton from "./components/LogoutButton";

type HistoricoItem = {
  data: string;
  batidas: string[];
};

interface User {
  id: string;
  nome: string;
}

const getProximoPonto = (quantidadeBatidas: number) => {
  const pontoLabels = [
    "Entrada (Início do Expediente)",
    "Saída para Almoço",
    "Retorno do Almoço ",
    "Saída (Fim do Expediente)",
  ];
  return (
    pontoLabels[quantidadeBatidas] ||
    "Você já bateu os pontos de hoje. Volte amanhã."
  );
};

const App = () => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [historico, setHistorico] = useState<HistoricoItem[]>(() => {
    const historicoSalvo = localStorage.getItem("historicoPontos");
    return historicoSalvo ? JSON.parse(historicoSalvo) : [];
  });
  const [batidas, setBatidas] = useState<string[]>(() => {
    const historicoSalvo = localStorage.getItem("historicoPontos");
    if (historicoSalvo) {
      const historicoParsed = JSON.parse(historicoSalvo);
      const dataAtual = new Date().toISOString().split("T")[0];
      const registroAtual = historicoParsed.find(
        (item: HistoricoItem) => item.data === dataAtual
      );
      return registroAtual ? registroAtual.batidas : [];
    }
    return [];
  });
  const [abaAtiva, setAbaAtiva] = useState<"hoje" | "historico">("hoje");
  const [modalAberto, setModalAberto] = useState(false);
  const [senha, setSenha] = useState("");
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setLoggedUser(user);
    localStorage.setItem("loggedUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem("loggedUser");
  };

  const handleBaterPonto = async () => {
    if (batidas.length >= 4) {
      alert("Você já bateu os 4 pontos do dia. Por favor, volte amanhã.");
      return;
    }

    const isTestMode = apiUrl.toLowerCase() === "teste";

    if (isTestMode) {
      const now = new Date();
      const hora = String(now.getHours()).padStart(2, "0");
      const minuto = String(now.getMinutes()).padStart(2, "0");
      const novaBatida = `${hora}${minuto}`;
      setBatidas((prev) => [...prev, novaBatida]);

      try {
        await axios.post(apiUrl);
      } catch (error) {
        console.log("Modo teste: requisição ignorada com erro", error);
      }
      return;
    }

    try {
      const response = await axios.post(apiUrl);
      const data = response.data;

      if (isValidApiResponse(data)) {
        const novasBatidas = mapApiResponseToBatidas(data);
        if (novasBatidas.length > 4) {
          alert("Você já bateu os 4 pontos do dia. Por favor, volte amanhã.");
          return;
        }
        setBatidas(novasBatidas);
      } else {
        alert("Resposta da API inválida!");
      }
    } catch (error) {
      console.error("Erro ao bater o ponto: ", error);
      alert("Erro ao tentar bater ponto. Tente novamente.");
    }
  };

  const handleExcluirHistorico = () => {
    if (senha === "0000") {
      setHistorico([]);
      setBatidas([]);
      localStorage.removeItem("historicoPontos");
      setModalAberto(false);
      setSenha("");
    } else {
      alert("Senha incorreta!");
    }
  };

  useEffect(() => {
    const historicoSalvo = localStorage.getItem("historicoPontos");
    if (historicoSalvo) {
      const historicoParsed = JSON.parse(historicoSalvo);
      setHistorico(historicoParsed);

      const dataAtual = new Date().toISOString().split("T")[0];
      const registroAtual = historicoParsed.find(
        (item: HistoricoItem) => item.data === dataAtual
      );
      if (registroAtual) {
        setBatidas(registroAtual.batidas);
      }
    }
    setDadosCarregados(true);
  }, []);

  useEffect(() => {
    if (!dadosCarregados) return;

    const dataAtual = new Date().toISOString().split("T")[0];
    const registroAtual = historico.find((item) => item.data === dataAtual);

    let novoHistorico;
    if (registroAtual) {
      novoHistorico = historico.map((item) =>
        item.data === dataAtual ? { ...item, batidas } : item
      );
    } else {
      novoHistorico = [{ data: dataAtual, batidas }, ...historico];
    }

    setHistorico(novoHistorico);
    localStorage.setItem("historicoPontos", JSON.stringify(novoHistorico));
  }, [batidas, dadosCarregados, historico]);

  if (!loggedUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Header />
      <Clock />
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          {loggedUser && <EmployeeInfo user={loggedUser} />}
          <StatusPanel
            nextPonto={getProximoPonto(batidas.length)}
            isDarkTheme={isDarkTheme}
          />
          <ApiForm apiUrl={apiUrl} setApiUrl={setApiUrl} />
          <button
            onClick={handleBaterPonto}
            className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
          >
            Registrar Ponto
          </button>
          <div className="mt-6">
            <Tabs abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
            {abaAtiva === "hoje" ? (
              <BatidasList batidas={batidas} isDarkTheme={isDarkTheme} />
            ) : (
              <HistoryTable historico={historico} />
            )}
          </div>
          {abaAtiva === "historico" && (
            <button
              onClick={() => setModalAberto(true)}
              className="mt-4 w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition-colors"
            >
              Excluir Histórico
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        isDarkTheme={isDarkTheme}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Excluir Histórico</h2>
          <p className="mb-4">Digite a senha para confirmar a exclusão:</p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={handleExcluirHistorico}
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
          >
            Confirmar Exclusão
          </button>
        </div>
      </Modal>
      <LogoutButton onLogout={handleLogout} />

      <DarkModeToggle
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
      />
    </div>
  );
};

export default App;
