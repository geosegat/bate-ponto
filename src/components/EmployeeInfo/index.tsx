import React from "react";

interface EmployeeInfoProps {
  user: {
    id: string;
    nome: string;
  };
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ user }) => {
  const currentDate = new Date().toLocaleDateString("pt-BR");

  const getInitials = (nome: string) => {
    const words = nome.trim().split(" ");
    if (words.length === 1) {
      return nome.substring(0, 2).toUpperCase();
    }
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center font-bold mr-2">
        {getInitials(user.nome)}
      </div>
      <div>
        <div className="font-semibold">{user.nome}</div>
        <div className="text-gray-600 text-sm">Data: {currentDate}</div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
