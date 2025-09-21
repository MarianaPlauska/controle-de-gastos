import React, { useState } from 'react';
import { useHealth } from '../contexts/HealthContext';
import { 
  Dumbbell, 
  Plus, 
  Clock, 
  Flame, 
  Target,
  Play,
  Pause,
  RotateCcw,
  Trash2
} from 'lucide-react';
import './ExerciseTracker.css';

const ExerciseTracker = () => {
  const { exercises, addExercise, deleteExercise } = useHealth();
  const [showForm, setShowForm] = useState(false);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0, isRunning: false });
  const [timerInterval, setTimerInterval] = useState(null);
  
  const [newExercise, setNewExercise] = useState({
    name: '',
    type: 'cardio',
    duration: '',
    calories: '',
    notes: ''
  });

  const exerciseTypes = {
    cardio: { label: 'Cardio', icon: '🏃‍♂️', color: '#ef4444' },
    strength: { label: 'Musculação', icon: '💪', color: '#8b5cf6' },
    flexibility: { label: 'Flexibilidade', icon: '🧘‍♀️', color: '#06b6d4' },
    sports: { label: 'Esportes', icon: '⚽', color: '#22c55e' },
    dance: { label: 'Dança', icon: '💃', color: '#ec4899' },
    yoga: { label: 'Yoga', icon: '🕉️', color: '#f59e0b' }
  };

  const quickWorkouts = [
    { name: 'Caminhada', type: 'cardio', duration: 30, calories: 150 },
    { name: 'Corrida', type: 'cardio', duration: 20, calories: 200 },
    { name: 'Musculação', type: 'strength', duration: 45, calories: 180 },
    { name: 'Yoga', type: 'yoga', duration: 30, calories: 120 },
    { name: 'Dança', type: 'dance', duration: 25, calories: 160 },
    { name: 'Alongamento', type: 'flexibility', duration: 15, calories: 50 }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExercise.name && newExercise.duration) {
      addExercise({
        ...newExercise,
        duration: parseInt(newExercise.duration),
        calories: parseInt(newExercise.calories) || 0
      });
      setNewExercise({ name: '', type: 'cardio', duration: '', calories: '', notes: '' });
      setShowForm(false);
    }
  };

  const handleQuickAdd = (workout) => {
    addExercise(workout);
  };

  // Timer functions
  const startTimer = () => {
    if (!timer.isRunning) {
      const interval = setInterval(() => {
        setTimer(prev => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = prev.minutes + Math.floor(newSeconds / 60);
          return {
            ...prev,
            seconds: newSeconds % 60,
            minutes: newMinutes,
            isRunning: true
          };
        });
      }, 1000);
      setTimerInterval(interval);
      setTimer(prev => ({ ...prev, isRunning: true }));
    }
  };

  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimer({ minutes: 0, seconds: 0, isRunning: false });
  };

  const formatTime = (minutes, seconds) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTodayExercises = () => {
    const today = new Date().toISOString().split('T')[0];
    return exercises.filter(ex => ex.date === today);
  };

  const getTodayStats = () => {
    const todayExercises = getTodayExercises();
    const totalDuration = todayExercises.reduce((sum, ex) => sum + ex.duration, 0);
    const totalCalories = todayExercises.reduce((sum, ex) => sum + (ex.calories || 0), 0);
    return { totalDuration, totalCalories, count: todayExercises.length };
  };

  const stats = getTodayStats();

  return (
    <div className="exercise-tracker">
      <div className="tracker-header">
        <h2>
          <Dumbbell size={24} />
          Exercícios
        </h2>
        <button 
          className="btn-add-exercise"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} />
          Adicionar
        </button>
      </div>

      {/* Timer de Exercício */}
      <div className="exercise-timer">
        <div className="timer-display">
          <div className="timer-time">
            {formatTime(timer.minutes, timer.seconds)}
          </div>
          <div className="timer-controls">
            {!timer.isRunning ? (
              <button onClick={startTimer} className="timer-btn start">
                <Play size={16} />
              </button>
            ) : (
              <button onClick={pauseTimer} className="timer-btn pause">
                <Pause size={16} />
              </button>
            )}
            <button onClick={resetTimer} className="timer-btn reset">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
        <p className="timer-label">Cronômetro de Exercício</p>
      </div>

      {/* Estatísticas do Dia */}
      <div className="today-stats">
        <div className="stat-card">
          <Target size={20} />
          <div>
            <span className="stat-value">{stats.count}</span>
            <span className="stat-label">exercícios</span>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={20} />
          <div>
            <span className="stat-value">{stats.totalDuration}min</span>
            <span className="stat-label">tempo total</span>
          </div>
        </div>
        <div className="stat-card">
          <Flame size={20} />
          <div>
            <span className="stat-value">{stats.totalCalories}</span>
            <span className="stat-label">calorias</span>
          </div>
        </div>
      </div>

      {/* Exercícios Rápidos */}
      <div className="quick-workouts">
        <h3>Exercícios Rápidos</h3>
        <div className="workout-grid">
          {quickWorkouts.map((workout, index) => {
            const typeInfo = exerciseTypes[workout.type];
            return (
              <button
                key={index}
                className="workout-card"
                onClick={() => handleQuickAdd(workout)}
                style={{ borderColor: typeInfo.color }}
              >
                <div className="workout-icon" style={{ background: typeInfo.color }}>
                  {typeInfo.icon}
                </div>
                <div className="workout-info">
                  <h4>{workout.name}</h4>
                  <p>{workout.duration}min • {workout.calories} cal</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Formulário de Exercício */}
      {showForm && (
        <div className="exercise-form-container">
          <form onSubmit={handleSubmit} className="exercise-form">
            <div className="form-header">
              <h3>Novo Exercício</h3>
              <button type="button" onClick={() => setShowForm(false)} className="btn-close">
                ×
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Nome do exercício"
              value={newExercise.name}
              onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
              required
            />
            
            <select
              value={newExercise.type}
              onChange={(e) => setNewExercise({...newExercise, type: e.target.value})}
            >
              {Object.entries(exerciseTypes).map(([key, type]) => (
                <option key={key} value={key}>{type.label}</option>
              ))}
            </select>
            
            <div className="form-row">
              <input
                type="number"
                placeholder="Duração (min)"
                value={newExercise.duration}
                onChange={(e) => setNewExercise({...newExercise, duration: e.target.value})}
                required
                min="1"
              />
              <input
                type="number"
                placeholder="Calorias (opcional)"
                value={newExercise.calories}
                onChange={(e) => setNewExercise({...newExercise, calories: e.target.value})}
                min="0"
              />
            </div>
            
            <textarea
              placeholder="Observações (opcional)"
              value={newExercise.notes}
              onChange={(e) => setNewExercise({...newExercise, notes: e.target.value})}
              rows="3"
            />
            
            <div className="form-actions">
              <button type="submit" className="btn-save">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Exercícios */}
      <div className="exercises-list">
        <h3>Histórico Recente</h3>
        {exercises.slice(0, 5).map(exercise => {
          const typeInfo = exerciseTypes[exercise.type];
          return (
            <div key={exercise.id} className="exercise-item">
              <div className="exercise-icon" style={{ background: typeInfo.color }}>
                {typeInfo.icon}
              </div>
              <div className="exercise-details">
                <h4>{exercise.name}</h4>
                <p>
                  {exercise.duration}min • {exercise.calories || 0} cal • {typeInfo.label}
                </p>
                {exercise.notes && <p className="exercise-notes">{exercise.notes}</p>}
                <span className="exercise-date">
                  {new Date(exercise.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <button
                onClick={() => deleteExercise(exercise.id)}
                className="btn-delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
        
        {exercises.length === 0 && (
          <div className="empty-exercises">
            <Dumbbell size={48} />
            <p>Nenhum exercício registrado ainda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;