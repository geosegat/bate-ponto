import React, { useState } from "react";
import users from "../../data/users.json";

interface User {
  id: string;
  nome: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [idInput, setIdInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = (users as User[]).find((u) => u.id === idInput.trim());
    if (user) {
      setError("");
      onLogin(user);
    } else {
      setError("ID inválido. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl mb-4 text-center">Digite seu ID para acessar</h1>
        <input
          type="text"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          placeholder="Seu ID"
          className="border p-2 rounded mb-4 w-full"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Acessar
        </button>
      </form>
    </div>
  );
};

export default Login;
