import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isDarkTheme?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  isDarkTheme = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`rounded-lg shadow-lg w-11/12 max-w-md ${
          isDarkTheme ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <div className="relative p-4">
          <button
            onClick={onClose}
            className={`absolute top-2 right-2 ${
              isDarkTheme
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
