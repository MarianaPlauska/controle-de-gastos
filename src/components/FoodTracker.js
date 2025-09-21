import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { 
  Utensils, 
  Plus, 
  Coffee, 
  Sun, 
  Moon, 
  Apple,
  Trash2,
  Camera,
  Scale
} from 'lucide-react';
import './FoodTracker.css';

const FoodTracker = () => {
  const { meals, addMeal, deleteMeal, weight, addWeight, deleteWeight } = useHealth();
  const [showMealForm, setShowMealForm] = useState(false);
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [activeTab, setActiveTab] = useState('meals');
  
  const [newMeal, setNewMeal] = useState({
    name: '',
    type: 'breakfast',
    calories: '',
    notes: ''
  });

  const [newWeight, setNewWeight] = useState('');

  const mealTypes = {
    breakfast: { label: 'Café da Manhã', icon: Coffee, color: '#f59e0b', emoji: '☀️' },
    lunch: { label: 'Almoço', icon: Sun, color: '#22c55e', emoji: '🌞' },
    dinner: { label: 'Jantar', icon: Moon, color: '#8b5cf6', emoji: '🌙' },
    snack: { label: 'Lanche', icon: Apple, color: '#ec4899', emoji: '🍎' }
  };

  const quickMeals = [
    { name: 'Café com pão', type: 'breakfast', calories: 250 },
    { name: 'Fruta', type: 'snack', calories: 80 },
    { name: 'Salada', type: 'lunch', calories: 150 },
    { name: 'Sanduíche', type: 'snack', calories: 300 },
    { name: 'Arroz e feijão', type: 'lunch', calories: 400 },
    { name: 'Iogurte', type: 'snack', calories: 120 }
  ];

  const handleMealSubmit = (e) => {
    e.preventDefault();
    if (newMeal.name) {
      addMeal({
        ...newMeal,
        calories: parseInt(newMeal.calories) || 0
      });
      setNewMeal({ name: '', type: 'breakfast', calories: '', notes: '' });
      setShowMealForm(false);
    }
  };

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    if (newWeight) {
      addWeight(parseFloat(newWeight));
      setNewWeight('');
      setShowWeightForm(false);
    }
  };

  const handleQuickMeal = (meal) => {
    addMeal(meal);
  };

  const getTodayMeals = () => {
    const today = new Date().toISOString().split('T')[0];
    return meals.filter(meal => meal.date === today);
  };

  const getTodayCalories = () => {
    return getTodayMeals().reduce((sum, meal) => sum + (meal.calories || 0), 0);
  };

  const getMealsByType = (type) => {
    return getTodayMeals().filter(meal => meal.type === type);
  };

  const getLatestWeight = () => {
    return weight.length > 0 ? weight[0].weight : null;
  };

  const getWeightTrend = () => {
    if (weight.length < 2) return null;
    const latest = weight[0].weight;
    const previous = weight[1].weight;
    const diff = latest - previous;
    return { diff: diff.toFixed(1), trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'stable' };
  };

  const todayCalories = getTodayCalories();
  const calorieGoal = 2000; // Pode ser configurável
  const caloriePercentage = Math.min((todayCalories / calorieGoal) * 100, 100);

  return (
    <div className="food-tracker">
      <div className="tracker-header">
        <h2>
          <Utensils size={24} />
          Alimentação
        </h2>
        <div className="header-tabs">
          <button 
            className={`tab-btn ${activeTab === 'meals' ? 'active' : ''}`}
            onClick={() => setActiveTab('meals')}
          >
            Refeições
          </button>
          <button 
            className={`tab-btn ${activeTab === 'weight' ? 'active' : ''}`}
            onClick={() => setActiveTab('weight')}
          >
            Peso
          </button>
        </div>
      </div>

      {activeTab === 'meals' && (
        <>
          {/* Resumo de Calorias */}
          <div className="calories-summary">
            <div className="calories-circle">
              <div className="circle-progress">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeDasharray={`${caloriePercentage * 2.83} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="circle-content">
                  <span className="calories-consumed">{todayCalories}</span>
                  <span className="calories-goal">de {calorieGoal} cal</span>
                </div>
              </div>
            </div>
            <div className="calories-info">
              <h3>Calorias Hoje</h3>
              <p>{Math.round(caloriePercentage)}% da meta diária</p>
              <div className="remaining-calories">
                <span>Restam: {Math.max(0, calorieGoal - todayCalories)} cal</span>
              </div>
            </div>
          </div>

          {/* Refeições por Tipo */}
          <div className="meals-by-type">
            {Object.entries(mealTypes).map(([type, info]) => {
              const typeMeals = getMealsByType(type);
              const typeCalories = typeMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
              const IconComponent = info.icon;
              
              return (
                <div key={type} className="meal-type-card">
                  <div className="meal-type-header" style={{ borderColor: info.color }}>
                    <div className="meal-type-info">
                      <span className="meal-emoji">{info.emoji}</span>
                      <div>
                        <h4>{info.label}</h4>
                        <p>{typeCalories} cal • {typeMeals.length} item(s)</p>
                      </div>
                    </div>
                    <IconComponent size={20} style={{ color: info.color }} />
                  </div>
                  {typeMeals.length > 0 && (
                    <div className="meal-items">
                      {typeMeals.map(meal => (
                        <div key={meal.id} className="meal-item">
                          <span>{meal.name}</span>
                          <span>{meal.calories || 0} cal</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Refeições Rápidas */}
          <div className="quick-meals">
            <h3>Adicionar Rapidamente</h3>
            <div className="quick-meals-grid">
              {quickMeals.map((meal, index) => {
                const typeInfo = mealTypes[meal.type];
                return (
                  <button
                    key={index}
                    className="quick-meal-btn"
                    onClick={() => handleQuickMeal(meal)}
                    style={{ borderColor: typeInfo.color }}
                  >
                    <span className="meal-emoji">{typeInfo.emoji}</span>
                    <div>
                      <span className="meal-name">{meal.name}</span>
                      <span className="meal-calories">{meal.calories} cal</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botão Adicionar Refeição */}
          <button 
            className="btn-add-meal"
            onClick={() => setShowMealForm(!showMealForm)}
          >
            <Plus size={20} />
            Adicionar Refeição Personalizada
          </button>

          {/* Formulário de Refeição */}
          {showMealForm && (
            <div className="meal-form-container">
              <form onSubmit={handleMealSubmit} className="meal-form">
                <div className="form-header">
                  <h3>Nova Refeição</h3>
                  <button type="button" onClick={() => setShowMealForm(false)} className="btn-close">
                    ×
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Nome da refeição"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                  required
                />
                
                <select
                  value={newMeal.type}
                  onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                >
                  {Object.entries(mealTypes).map(([key, type]) => (
                    <option key={key} value={key}>{type.label}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  placeholder="Calorias (opcional)"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                  min="0"
                />
                
                <textarea
                  placeholder="Observações (opcional)"
                  value={newMeal.notes}
                  onChange={(e) => setNewMeal({...newMeal, notes: e.target.value})}
                  rows="3"
                />
                
                <div className="form-actions">
                  <button type="submit" className="btn-save">Salvar</button>
                  <button type="button" onClick={() => setShowMealForm(false)} className="btn-cancel">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {activeTab === 'weight' && (
        <>
          {/* Controle de Peso */}
          <div className="weight-section">
            <div className="weight-current">
              <div className="weight-display">
                <Scale size={32} />
                <div className="weight-info">
                  <span className="current-weight">
                    {getLatestWeight() ? `${getLatestWeight()} kg` : 'Não registrado'}
                  </span>
                  {getWeightTrend() && (
                    <span className={`weight-trend ${getWeightTrend().trend}`}>
                      {getWeightTrend().trend === 'up' ? '↗' : getWeightTrend().trend === 'down' ? '↘' : '→'}
                      {Math.abs(getWeightTrend().diff)} kg
                    </span>
                  )}
                </div>
              </div>
              
              <button 
                className="btn-add-weight"
                onClick={() => setShowWeightForm(!showWeightForm)}
              >
                <Plus size={16} />
                Registrar Peso
              </button>
            </div>

            {showWeightForm && (
              <div className="weight-form">
                <form onSubmit={handleWeightSubmit}>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Seu peso (kg)"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    required
                    min="30"
                    max="300"
                  />
                  <div className="form-actions">
                    <button type="submit" className="btn-save">Salvar</button>
                    <button type="button" onClick={() => setShowWeightForm(false)} className="btn-cancel">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Histórico de Peso */}
            <div className="weight-history">
              <h3>Histórico de Peso</h3>
              {weight.length > 0 ? (
                <div className="weight-list">
                  {weight.slice(0, 10).map(entry => (
                    <div key={entry.id} className="weight-entry">
                      <div className="weight-data">
                        <span className="weight-value">{entry.weight} kg</span>
                        <span className="weight-date">
                          {new Date(entry.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteWeight(entry.id)}
                        className="btn-delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-weight">
                  <Scale size={48} />
                  <p>Nenhum peso registrado ainda</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodTracker;