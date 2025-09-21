import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { Droplets, Plus, Target, TrendingUp } from 'lucide-react';
import './WaterTracker.css';

const WaterTracker = () => {
  const { waterIntake, addWater, getTodayWater, setWaterGoal } = useHealth();
  const [customAmount, setCustomAmount] = useState('');
  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [newGoal, setNewGoal] = useState(waterIntake.goal);

  const todayWater = getTodayWater();
  const percentage = Math.min((todayWater / waterIntake.goal) * 100, 100);

  const quickAmounts = [
    { label: '200ml', value: 200, icon: '🥛' },
    { label: '300ml', value: 300, icon: '💧' },
    { label: '500ml', value: 500, icon: '🍶' },
    { label: '750ml', value: 750, icon: '🚰' }
  ];

  const handleQuickAdd = (amount) => {
    addWater(amount);
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      addWater(amount);
      setCustomAmount('');
    }
  };

  const handleGoalUpdate = () => {
    if (newGoal > 0) {
      setWaterGoal(newGoal);
      setShowGoalEdit(false);
    }
  };

  const getMotivationalMessage = () => {
    if (percentage >= 100) return "🎉 Meta alcançada! Parabéns!";
    if (percentage >= 75) return "💪 Quase lá! Continue assim!";
    if (percentage >= 50) return "👍 Você está no caminho certo!";
    if (percentage >= 25) return "🌱 Bom começo! Continue bebendo água!";
    return "💧 Vamos começar a se hidratar!";
  };

  const getWaveHeight = () => {
    return Math.max(percentage, 10); // Mínimo de 10% para mostrar a onda
  };

  return (
    <div className="water-tracker">
      <div className="tracker-header">
        <div className="header-info">
          <h2>
            <Droplets size={24} />
            Controle de Água
          </h2>
          <p>{getMotivationalMessage()}</p>
        </div>
        
        <button 
          className="goal-button"
          onClick={() => setShowGoalEdit(!showGoalEdit)}
        >
          <Target size={16} />
          Meta: {waterIntake.goal}ml
        </button>
      </div>

      {showGoalEdit && (
        <div className="goal-edit">
          <input
            type="number"
            value={newGoal}
            onChange={(e) => setNewGoal(parseInt(e.target.value))}
            placeholder="Nova meta (ml)"
            min="500"
            max="5000"
          />
          <div className="goal-actions">
            <button onClick={handleGoalUpdate} className="btn-save">Salvar</button>
            <button onClick={() => setShowGoalEdit(false)} className="btn-cancel">Cancelar</button>
          </div>
        </div>
      )}

      <div className="water-progress">
        <div className="water-bottle">
          <div className="bottle-container">
            <div 
              className="water-fill"
              style={{ height: `${getWaveHeight()}%` }}
            >
              <div className="water-wave"></div>
            </div>
            <div className="bottle-labels">
              <span className="current-amount">{todayWater}ml</span>
              <span className="percentage">{Math.round(percentage)}%</span>
            </div>
          </div>
        </div>
        
        <div className="progress-info">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="progress-text">
            <span>{todayWater}ml de {waterIntake.goal}ml</span>
            <span className="remaining">
              Faltam {Math.max(0, waterIntake.goal - todayWater)}ml
            </span>
          </div>
        </div>
      </div>

      <div className="quick-add">
        <h3>Adicionar Água</h3>
        <div className="quick-buttons">
          {quickAmounts.map(item => (
            <button
              key={item.value}
              className="quick-btn"
              onClick={() => handleQuickAdd(item.value)}
            >
              <span className="emoji">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="custom-add">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Quantidade personalizada (ml)"
            min="1"
            max="2000"
          />
          <button 
            onClick={handleCustomAdd}
            className="btn-add-custom"
            disabled={!customAmount || customAmount <= 0}
          >
            <Plus size={16} />
            Adicionar
          </button>
        </div>
      </div>

      <div className="water-stats">
        <div className="stat-card">
          <TrendingUp size={20} />
          <div>
            <span className="stat-value">{Math.round(percentage)}%</span>
            <span className="stat-label">da meta hoje</span>
          </div>
        </div>
        <div className="stat-card">
          <Droplets size={20} />
          <div>
            <span className="stat-value">{waterIntake.daily.length}</span>
            <span className="stat-label">dias registrados</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;