import { ImageIcon, Play, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";

const WordCard = ({ word, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
        {!imageError && word.imageUrl ? (
          <img
            src={word.imageUrl}
            alt={word.word}
            onError={handleImageError}
            className="w-full h-full object-fill"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Trash2 className="w-16 h-16 text-gray-400" />
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onEdit(word)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          >
            <SquarePen className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(word._id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{word.word}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{word.definition}</p>

        <div className="flex gap-3">
          {word.videoUrl && (
            <a
              href={word.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </a>
          )}
          <a
            href={word.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <button className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              View
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
