import React, { createContext, useContext, useState, useEffect } from 'react';

const HealthContext = createContext();

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth deve ser usado dentro de HealthProvider');
  }
  return context;
};

export const HealthProvider = ({ children }) => {
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('waterIntake');
    return saved ? JSON.parse(saved) : {
      daily: [],
      goal: 2000 // ml por dia
    };
  });

  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem('exercises');
    return saved ? JSON.parse(saved) : [];
  });

  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : [];
  });

  const [weight, setWeight] = useState(() => {
    const saved = localStorage.getItem('weightHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weight));
  }, [weight]);

  // Água
  const addWater = (amount) => {
    const today = new Date().toISOString().split('T')[0];
    const todayIntake = waterIntake.daily.find(d => d.date === today);
    
    if (todayIntake) {
      setWaterIntake(prev => ({
        ...prev,
        daily: prev.daily.map(d => 
          d.date === today 
            ? { ...d, amount: d.amount + amount, logs: [...d.logs, { time: new Date().toISOString(), amount }] }
            : d
        )
      }));
    } else {
      setWaterIntake(prev => ({
        ...prev,
        daily: [...prev.daily, {
          date: today,
          amount,
          logs: [{ time: new Date().toISOString(), amount }]
        }]
      }));
    }
  };

  const getTodayWater = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayIntake = waterIntake.daily.find(d => d.date === today);
    return todayIntake ? todayIntake.amount : 0;
  };

  // Exercícios
  const addExercise = (exercise) => {
    const newExercise = {
      id: Date.now(),
      ...exercise,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setExercises(prev => [newExercise, ...prev]);
  };

  const deleteExercise = (id) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  // Refeições
  const addMeal = (meal) => {
    const newMeal = {
      id: Date.now(),
      ...meal,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setMeals(prev => [newMeal, ...prev]);
  };

  const deleteMeal = (id) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  // Peso
  const addWeight = (weightValue) => {
    const newWeight = {
      id: Date.now(),
      weight: weightValue,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setWeight(prev => [newWeight, ...prev]);
  };

  const deleteWeight = (id) => {
    setWeight(prev => prev.filter(w => w.id !== id));
  };

  return (
    <HealthContext.Provider value={{
      // Água
      waterIntake,
      addWater,
      getTodayWater,
      setWaterGoal: (goal) => setWaterIntake(prev => ({ ...prev, goal })),
      
      // Exercícios
      exercises,
      addExercise,
      deleteExercise,
      
      // Refeições
      meals,
      addMeal,
      deleteMeal,
      
      // Peso
      weight,
      addWeight,
      deleteWeight
    }}>
      {children}
    </HealthContext.Provider>
  );
};