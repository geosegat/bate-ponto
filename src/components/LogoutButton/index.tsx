import { LogOut } from "lucide-react";
import { FC } from "react";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={onLogout}
        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default LogoutButton;
