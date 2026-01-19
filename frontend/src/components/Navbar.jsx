/**
 * Componente de barra de navegación
 */
import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">🎲</span>
              <span className="ml-2 text-xl font-bold text-gray-800">
                Números Aleatorios
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">
              Hola, <span className="font-semibold">{user?.username}</span>
            </span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;