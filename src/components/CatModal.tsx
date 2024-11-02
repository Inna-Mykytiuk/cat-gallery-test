import React, { useEffect } from 'react';

interface CatModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  temperament: string;
  description: string;
  lifeSpan: string;
  imageUrl: string;
}

const CatModal: React.FC<CatModalProps> = ({ isOpen, onClose, name, temperament, description, lifeSpan, imageUrl }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
        <button onClick={onClose} className="absolute top-0 right-2 text-2xl text-black/50 font-bold">
          ×
        </button>
        <img src={imageUrl} alt={`Cat ${name}`} className="w-full h-агдд object-cover rounded-md mb-4" />
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="italic text-sm mb-4">{temperament}</p>
        <p className="mb-4">{description}</p>
        <p className="font-semibold">Life Span: {lifeSpan} years</p>
      </div>
    </div>
  );
};

export default CatModal;
