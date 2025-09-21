import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : { name: '', avatar: '' };
  });

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('userReminders');
    return saved ? JSON.parse(saved) : [];
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('userTodos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('userReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('userTodos', JSON.stringify(todos));
  }, [todos]);

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const addReminder = (reminder) => {
    const newReminder = {
      id: Date.now(),
      ...reminder,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const removeReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      reminders,
      addReminder,
      removeReminder,
      todos,
      addTodo,
      toggleTodo,
      removeTodo
    }}>
      {children}
    </UserContext.Provider>
  );
};