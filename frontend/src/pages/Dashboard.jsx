/**
 * Página principal del dashboard
 */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import RandomNumberDisplay from '../components/RandomNumberDisplay';
import History from '../components/History';
import { randomService } from '../services/api';

const Dashboard = ({ user, onLogout }) => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentColor, setCurrentColor] = useState('#4ECDC4');
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    loadHistory();
    loadStats();
    generateNumber(); // Generar primer número automáticamente
  }, []);

  const generateNumber = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await randomService.generate();
      setCurrentNumber(data.number);
      setCurrentColor(data.color);
      
      // Actualizar historial y estadísticas
      await loadHistory();
      await loadStats();
    } catch (err) {
      setError('Error al generar número. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const data = await randomService.getHistory(10);
      setHistory(data);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const loadStats = async () => {
    try {
      const data = await randomService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 animate-slide-up">
            {error}
          </div>
        )}

        {/* Componente principal de número aleatorio */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <RandomNumberDisplay
            number={currentNumber}
            color={currentColor}
            onRegenerate={generateNumber}
            loading={loading}
          />
        </div>

        {/* Historial y estadísticas */}
        <History history={history} stats={stats} />
      </div>
    </div>
  );
};

export default Dashboard;