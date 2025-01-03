import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface CatModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  temperament: string;
  description: string;
  lifeSpan: string;
  imageUrl: string;
}

const modalRoot = document.querySelector("#modal-root");

const toggleBodyOverflow = (toggle: boolean) => {
  document.body.style.overflow = toggle ? "hidden" : "auto";
};

const CatModal: React.FC<CatModalProps> = ({
  isOpen,
  onClose,
  name,
  temperament,
  description,
  lifeSpan,
  imageUrl,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      toggleBodyOverflow(true); // Виклик для приховування прокрутки
    } else {
      toggleBodyOverflow(false); // Відновлення прокрутки при закритті
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      toggleBodyOverflow(false); // Відновлення прокрутки після видалення компонента
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null; // Перевірка modalRoot

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative max-h-[80vh] w-11/12 max-w-md overflow-y-auto rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal button"
          onClick={onClose}
          className="absolute right-2 top-0 text-2xl font-bold text-black/50"
        >
          ×
        </button>
        <img
          src={imageUrl}
          alt={`Cat ${name}`}
          className="mb-4 h-auto w-full rounded-md object-cover"
        />
        <h2 className="mb-2 text-2xl font-bold">{name}</h2>
        <p className="mb-4 text-sm italic">{temperament}</p>
        <p className="mb-4">{description}</p>
        <p className="font-semibold">Life Span: {lifeSpan} years</p>
      </div>
    </div>,
    modalRoot,
  );
};

export default CatModal;
