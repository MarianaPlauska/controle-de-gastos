import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import WaterTracker from './WaterTracker';
import ExerciseTracker from './ExerciseTracker';
import FoodTracker from './FoodTracker';
import HealthHistory from './HealthHistory';
import { 
  Heart, 
  Droplets, 
  Dumbbell, 
  Utensils,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import './HealthScreen.css';

const HealthScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { getTodayWater, waterIntake, exercises, meals, weight } = useHealth();

  const tabs = [
    { id: 'overview', label: 'Resumo', icon: Heart },
    { id: 'water', label: 'Água', icon: Droplets },
    { id: 'exercise', label: 'Exercícios', icon: Dumbbell },
    { id: 'food', label: 'Alimentação', icon: Utensils },
    { id: 'history', label: 'Histórico', icon: TrendingUp }
  ];

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Água
    const todayWater = getTodayWater();
    const waterPercentage = Math.min((todayWater / waterIntake.goal) * 100, 100);
    
    // Exercícios
    const todayExercises = exercises.filter(ex => ex.date === today);
    const totalExerciseTime = todayExercises.reduce((sum, ex) => sum + ex.duration, 0);
    const totalCaloriesBurned = todayExercises.reduce((sum, ex) => sum + (ex.calories || 0), 0);
    
    // Alimentação
    const todayMeals = meals.filter(meal => meal.date === today);
    const totalCaloriesConsumed = todayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    
    // Peso
    const currentWeight = weight.length > 0 ? weight[0].weight : null;
    
    return {
      water: { consumed: todayWater, goal: waterIntake.goal, percentage: waterPercentage },
      exercise: { count: todayExercises.length, time: totalExerciseTime, calories: totalCaloriesBurned },
      food: { meals: todayMeals.length, calories: totalCaloriesConsumed },
      weight: currentWeight
    };
  };

  const getHealthScore = () => {
    const stats = getTodayStats();
    let score = 0;
    
    // Água (30 pontos)
    score += Math.min(stats.water.percentage, 100) * 0.3;
    
    // Exercício (40 pontos)
    if (stats.exercise.count > 0) score += 20;
    if (stats.exercise.time >= 30) score += 20;
    
    // Alimentação (30 pontos)
    if (stats.food.meals >= 3) score += 15;
    if (stats.food.calories >= 1200 && stats.food.calories <= 2500) score += 15;
    
    return Math.round(score);
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return { message: "Excelente! Você está cuidando muito bem da sua saúde! 🏆", color: "#22c55e" };
    if (score >= 70) return { message: "Muito bom! Continue assim! 💪", color: "#22c55e" };
    if (score >= 50) return { message: "Bom trabalho! Há espaço para melhorar! 👍", color: "#f59e0b" };
    if (score >= 30) return { message: "Você está no caminho certo! 🌱", color: "#f59e0b" };
    return { message: "Vamos começar a cuidar melhor da saúde! 💚", color: "#ef4444" };
  };

  const stats = getTodayStats();
  const healthScore = getHealthScore();
  const scoreInfo = getScoreMessage(healthScore);

  const renderOverview = () => (
    <div className="health-overview">
      {/* Score de Saúde */}
      <div className="health-score-card">
        <div className="score-circle">
          <div className="score-progress">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={scoreInfo.color}
                strokeWidth="6"
                strokeDasharray={`${healthScore * 2.83} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="score-content">
              <span className="score-value">{healthScore}</span>
              <span className="score-label">Score</span>
            </div>
          </div>
        </div>
        <div className="score-info">
          <h3>Score de Saúde Hoje</h3>
          <p style={{ color: scoreInfo.color }}>{scoreInfo.message}</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card water">
          <div className="stat-icon">
            <Droplets size={24} />
          </div>
          <div className="stat-content">
            <h4>Hidratação</h4>
            <div className="stat-value">{stats.water.consumed}ml</div>
            <div className="stat-progress">
              <div 
                className="stat-progress-bar"
                style={{ width: `${stats.water.percentage}%` }}
              />
            </div>
            <p>{Math.round(stats.water.percentage)}% da meta</p>
          </div>
        </div>

        <div className="stat-card exercise">
          <div className="stat-icon">
            <Dumbbell size={24} />
          </div>
          <div className="stat-content">
            <h4>Exercícios</h4>
            <div className="stat-value">{stats.exercise.count}</div>
            <div className="stat-details">
              <span>{stats.exercise.time}min</span>
              <span>{stats.exercise.calories} cal</span>
            </div>
          </div>
        </div>

        <div className="stat-card food">
          <div className="stat-icon">
            <Utensils size={24} />
          </div>
          <div className="stat-content">
            <h4>Alimentação</h4>
            <div className="stat-value">{stats.food.meals}</div>
            <div className="stat-details">
              <span>refeições</span>
              <span>{stats.food.calories} cal</span>
            </div>
          </div>
        </div>

        {stats.weight && (
          <div className="stat-card weight">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h4>Peso Atual</h4>
              <div className="stat-value">{stats.weight} kg</div>
              <p>Último registro</p>
            </div>
          </div>
        )}
      </div>

      {/* Metas e Conquistas */}
      <div className="achievements">
        <h3>
          <Award size={20} />
          Conquistas de Hoje
        </h3>
        <div className="achievement-list">
          {stats.water.percentage >= 100 && (
            <div className="achievement-item completed">
              <Droplets size={16} />
              <span>Meta de água alcançada!</span>
            </div>
          )}
          {stats.exercise.count > 0 && (
            <div className="achievement-item completed">
              <Dumbbell size={16} />
              <span>Exercitou-se hoje!</span>
            </div>
          )}
          {stats.food.meals >= 3 && (
            <div className="achievement-item completed">
              <Utensils size={16} />
              <span>Fez pelo menos 3 refeições!</span>
            </div>
          )}
          {stats.exercise.time >= 30 && (
            <div className="achievement-item completed">
              <Target size={16} />
              <span>30+ minutos de exercício!</span>
            </div>
          )}
        </div>
      </div>

      {/* Dicas de Saúde */}
      <div className="health-tips">
        <h3>💡 Dicas para Hoje</h3>
        <div className="tips-list">
          {stats.water.percentage < 50 && (
            <div className="tip-item">
              <Droplets size={16} />
              <span>Beba mais água! Você está abaixo da meta.</span>
            </div>
          )}
          {stats.exercise.count === 0 && (
            <div className="tip-item">
              <Dumbbell size={16} />
              <span>Que tal fazer uma caminhada de 15 minutos?</span>
            </div>
          )}
          {stats.food.meals < 3 && (
            <div className="tip-item">
              <Utensils size={16} />
              <span>Não esqueça de fazer suas refeições regulares!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="health-screen">
      <div className="screen-header">
        <h1>Saúde & Bem-estar</h1>
        <p>Cuide do seu corpo e mente</p>
      </div>

      <div className="health-tabs">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`health-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="health-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'water' && <WaterTracker />}
        {activeTab === 'exercise' && <ExerciseTracker />}
        {activeTab === 'food' && <FoodTracker />}
        {activeTab === 'history' && <HealthHistory />}
      </div>
    </div>
  );
};

export default HealthScreen;