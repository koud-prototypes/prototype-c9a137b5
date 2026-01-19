/**
 * Componente para mostrar el número aleatorio generado
 */
import React from 'react';

const RandomNumberDisplay = ({ number, color, onRegenerate, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      {/* Contenedor del número con fondo de color */}
      <div
        className="w-80 h-80 rounded-3xl shadow-2xl flex items-center justify-center transform transition-all duration-500 hover:scale-105 animate-fade-in"
        style={{ backgroundColor: color }}
      >
        <div className="text-center">
          <div className="text-8xl font-bold text-white drop-shadow-lg animate-slide-up">
            {number !== null ? number : '?'}
          </div>
          <div className="text-white text-xl mt-4 opacity-90">
            Número Aleatorio
          </div>
        </div>
      </div>

      {/* Botón de regenerar */}
      <button
        onClick={onRegenerate}
        disabled={loading}
        className={`mt-12 px-8 py-4 rounded-xl text-white text-lg font-semibold shadow-lg transform transition-all duration-200 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95'
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generando...
          </span>
        ) : (
          '🔄 Generar Nuevo Número'
        )}
      </button>

      {/* Mostrar color hexadecimal */}
      {color && (
        <div className="mt-6 text-gray-600 text-sm">
          Color: <span className="font-mono font-semibold">{color}</span>
        </div>
      )}
    </div>
  );
};

export default RandomNumberDisplay;