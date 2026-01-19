/**
 * Componente para mostrar el historial de números generados
 */
import React from 'react';

const History = ({ history, stats }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Historial y Estadísticas
      </h2>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="text-blue-600 text-sm font-semibold">Total Generados</div>
            <div className="text-3xl font-bold text-blue-800">
              {stats.total_generated}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="text-green-600 text-sm font-semibold">Promedio</div>
            <div className="text-3xl font-bold text-green-800">
              {stats.average.toFixed(0)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="text-orange-600 text-sm font-semibold">Mínimo</div>
            <div className="text-3xl font-bold text-orange-800">{stats.min}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="text-purple-600 text-sm font-semibold">Máximo</div>
            <div className="text-3xl font-bold text-purple-800">{stats.max}</div>
          </div>
        </div>
      )}

      {/* Historial */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Últimos Números Generados
      </h3>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hay números generados aún. ¡Comienza generando tu primer número!
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center shadow-md"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="text-2xl font-bold text-white">
                    {item.number}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {formatDate(item.created_at)}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {item.color}
                  </div>
                </div>
              </div>
              <div className="text-gray-400 font-semibold">
                #{history.length - index}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;