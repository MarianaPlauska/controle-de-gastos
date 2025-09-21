import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { 
  Calendar, 
  Droplets, 
  Dumbbell, 
  Utensils,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import './HealthHistory.css';

const HealthHistory = () => {
  const { waterIntake, exercises, meals, weight } = useHealth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState('water');

  const tabs = [
    { id: 'water', label: 'Água', icon: Droplets },
    { id: 'exercise', label: 'Exercícios', icon: Dumbbell },
    { id: 'food', label: 'Alimentação', icon: Utensils }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const changeDate = (direction) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + direction);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const getWaterForDate = (date) => {
    return waterIntake.daily?.find(d => d.date === date) || { amount: 0, logs: [] };
  };

  const getExercisesForDate = (date) => {
    return exercises.filter(ex => ex.date === date);
  };

  const getMealsForDate = (date) => {
    return meals.filter(meal => meal.date === date);
  };

  const renderWaterHistory = () => {
    const dayWater = getWaterForDate(selectedDate);
    const percentage = Math.min((dayWater.amount / waterIntake.goal) * 100, 100);

    return (
      <div className="history-content">
        <div className="day-summary">
          <div className="summary-card water">
            <div className="summary-icon">
              <Droplets size={24} />
            </div>
            <div className="summary-info">
              <h3>{dayWater.amount}ml</h3>
              <p>{Math.round(percentage)}% da meta</p>
            </div>
            <div className="summary-progress">
              <div 
                className="progress-bar"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="history-list">
          <h4>Registros do Dia</h4>
          {dayWater.logs && dayWater.logs.length > 0 ? (
            dayWater.logs.map((log, index) => (
              <div key={index} className="history-item">
                <div className="item-icon">
                  <Droplets size={16} />
                </div>
                <div className="item-content">
                  <span className="item-amount">{log.amount}ml</span>
                  <span className="item-time">
                    {new Date(log.time).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-history">
              <p>Nenhum registro de água neste dia</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderExerciseHistory = () => {
    const dayExercises = getExercisesForDate(selectedDate);
    const totalTime = dayExercises.reduce((sum, ex) => sum + ex.duration, 0);
    const totalCalories = dayExercises.reduce((sum, ex) => sum + (ex.calories || 0), 0);

    const exerciseTypes = {
      cardio: { label: 'Cardio', color: '#ef4444' },
      strength: { label: 'Musculação', color: '#8b5cf6' },
      flexibility: { label: 'Flexibilidade', color: '#06b6d4' },
      sports: { label: 'Esportes', color: '#22c55e' },
      dance: { label: 'Dança', color: '#ec4899' },
      yoga: { label: 'Yoga', color: '#f59e0b' }
    };

    return (
      <div className="history-content">
        <div className="day-summary">
          <div className="summary-card exercise">
            <div className="summary-icon">
              <Dumbbell size={24} />
            </div>
            <div className="summary-info">
              <h3>{dayExercises.length} exercícios</h3>
              <p>{totalTime}min • {totalCalories} cal</p>
            </div>
          </div>
        </div>

        <div className="history-list">
          <h4>Exercícios do Dia</h4>
          {dayExercises.length > 0 ? (
            dayExercises.map(exercise => (
              <div key={exercise.id} className="history-item">
                <div 
                  className="item-icon"
                  style={{ backgroundColor: exerciseTypes[exercise.type]?.color }}
                >
                  <Dumbbell size={16} />
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <span className="item-name">{exercise.name}</span>
                    <span className="item-type">{exerciseTypes[exercise.type]?.label}</span>
                  </div>
                  <div className="item-details">
                    <span>{exercise.duration}min</span>
                    {exercise.calories && <span>{exercise.calories} cal</span>}
                  </div>
                  {exercise.notes && (
                    <p className="item-notes">{exercise.notes}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-history">
              <p>Nenhum exercício registrado neste dia</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFoodHistory = () => {
    const dayMeals = getMealsForDate(selectedDate);
    const totalCalories = dayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

    const mealTypes = {
      breakfast: { label: 'Café da Manhã', emoji: '☀️', color: '#f59e0b' },
      lunch: { label: 'Almoço', emoji: '🌞', color: '#22c55e' },
      dinner: { label: 'Jantar', emoji: '🌙', color: '#8b5cf6' },
      snack: { label: 'Lanche', emoji: '🍎', color: '#ec4899' }
    };

    const mealsByType = Object.keys(mealTypes).map(type => ({
      type,
      ...mealTypes[type],
      meals: dayMeals.filter(meal => meal.type === type),
      calories: dayMeals.filter(meal => meal.type === type)
        .reduce((sum, meal) => sum + (meal.calories || 0), 0)
    }));

    return (
      <div className="history-content">
        <div className="day-summary">
          <div className="summary-card food">
            <div className="summary-icon">
              <Utensils size={24} />
            </div>
            <div className="summary-info">
              <h3>{dayMeals.length} refeições</h3>
              <p>{totalCalories} calorias</p>
            </div>
          </div>
        </div>

        <div className="history-list">
          <h4>Refeições do Dia</h4>
          {mealsByType.map(typeGroup => (
            typeGroup.meals.length > 0 && (
              <div key={typeGroup.type} className="meal-group">
                <div className="meal-group-header">
                  <span className="meal-emoji">{typeGroup.emoji}</span>
                  <span className="meal-type">{typeGroup.label}</span>
                  <span className="meal-calories">{typeGroup.calories} cal</span>
                </div>
                <div className="meal-items">
                  {typeGroup.meals.map(meal => (
                    <div key={meal.id} className="history-item">
                      <div className="item-content">
                        <div className="item-header">
                          <span className="item-name">{meal.name}</span>
                          <span className="item-calories">{meal.calories || 0} cal</span>
                        </div>
                        {meal.notes && (
                          <p className="item-notes">{meal.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
          
          {dayMeals.length === 0 && (
            <div className="empty-history">
              <p>Nenhuma refeição registrada neste dia</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="health-history">
      <div className="history-header">
        <h2>Histórico de Saúde</h2>
        
        <div className="date-navigator">
          <button onClick={() => changeDate(-1)} className="date-btn">
            <ChevronLeft size={16} />
          </button>
          <span className="current-date">
            <Calendar size={16} />
            {formatDate(selectedDate)}
          </span>
          <button onClick={() => changeDate(1)} className="date-btn">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="history-tabs">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`history-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'water' && renderWaterHistory()}
      {activeTab === 'exercise' && renderExerciseHistory()}
      {activeTab === 'food' && renderFoodHistory()}
    </div>
  );
};

export default HealthHistory;