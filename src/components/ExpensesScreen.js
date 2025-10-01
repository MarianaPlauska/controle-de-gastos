import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { 
  ShoppingCart, 
  Car, 
  Utensils, 
  Coffee, 
  Heart, 
  GraduationCap,
  Package,
  MoreHorizontal,
  Settings,
  Plus,
  Edit3,
  Save,
  X
} from 'lucide-react';
import './ExpensesScreen.css';

// Componente para formulário de gastos gerais
const GeneralExpenseForm = ({ category, onAddExpense, categoryColor }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: category === 'rendimento' ? 'income' : 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({
      ...formData,
      category,
      amount: parseFloat(formData.amount)
    });
    setFormData({
      description: '',
      amount: '',
      type: category === 'rendimento' ? 'income' : 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="general-expense-form">
      <h3>Adicionar {category === 'rendimento' ? 'Rendimento' : 'Gasto'}</h3>
      
      <div className="form-row">
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Valor (R$)"
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        {(category === 'rendimento' || category === 'investimentos') && (
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Entrada</option>
            <option value="expense">Saída</option>
          </select>
        )}
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        style={{ backgroundColor: categoryColor }}
      >
        <Plus size={18} />
        Adicionar
      </button>
    </form>
  );
};

// Componente para lista de gastos gerais
const GeneralExpenseList = ({ expenses }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="general-expense-list">
      <h3>Histórico</h3>
      <div className="expense-items">
        {expenses.map(expense => (
          <div key={expense.id} className={`expense-item ${expense.type}`}>
            <div className="expense-info">
              <h4>{expense.description}</h4>
              <span className="expense-date">{formatDate(expense.date)}</span>
            </div>
            <div className={`expense-amount ${expense.type}`}>
              {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExpensesScreen = () => {
  const { navigateTo } = useNavigation();
  const [currentCategory, setCurrentCategory] = useState('mercado');
  const [generalExpenses, setGeneralExpenses] = useState(() => {
    const saved = localStorage.getItem('generalExpenses');
    return saved ? JSON.parse(saved) : [];
  });

  // Categorias específicas para gastos gerais (não do cartão)
  const generalCategories = {
    mercado: 'Mercado',
    lazer: 'Lazer',
    compras: 'Compras',
    rendimento: 'Rendimento',
    investimentos: 'Investimentos',
    economia: 'Economia'
  };

  const categoryIcons = {
    mercado: ShoppingCart,
    lazer: Coffee,
    compras: Package,
    rendimento: Heart,
    investimentos: GraduationCap,
    economia: Car
  };

  const categoryColors = {
    mercado: '#22c55e',
    lazer: '#ec4899',
    compras: '#8b5cf6',
    rendimento: '#f59e0b',
    investimentos: '#2563eb',
    economia: '#06b6d4'
  };

  // Filtrar gastos por categoria
  const filteredExpenses = generalExpenses.filter(expense => 
    expense.category === currentCategory
  );

  const getTotalByCategory = (category) => {
    return generalExpenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + (expense.type === 'income' ? expense.amount : -expense.amount), 0);
  };

  const addGeneralExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: expense.date || new Date().toISOString().split('T')[0]
    };
    const updatedExpenses = [...generalExpenses, newExpense];
    setGeneralExpenses(updatedExpenses);
    localStorage.setItem('generalExpenses', JSON.stringify(updatedExpenses));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="expenses-screen">
      <div className="screen-header">
        <div className="header-content">
          <div>
            <h1>Controle de Gastos</h1>
            <p>Organize seus gastos por categoria</p>
          </div>
        </div>
      </div>

      <div className="categories-scroll">
        <div className="categories-list">
          {Object.entries(generalCategories).map(([key, label]) => {
            const IconComponent = categoryIcons[key] || MoreHorizontal;
            const isActive = currentCategory === key;
            const total = getTotalByCategory(key);
            
            return (
              <div
                key={key}
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentCategory(key)}
                style={{ 
                  borderColor: isActive ? categoryColors[key] : '#e2e8f0',
                  background: isActive ? `${categoryColors[key]}15` : '#ffffff'
                }}
              >
                <div 
                  className="category-icon"
                  style={{ 
                    background: isActive ? categoryColors[key] : '#f1f5f9',
                    color: isActive ? '#ffffff' : categoryColors[key]
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <div className="category-info">
                  <h3>{label}</h3>
                  <p>{formatCurrency(Math.abs(total))}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="current-category">
        <div className="category-header">
          <div className="category-title">
            {React.createElement(categoryIcons[currentCategory] || MoreHorizontal, { size: 24 })}
            <h2>{generalCategories[currentCategory]}</h2>
          </div>
          <div className="category-total">
            {formatCurrency(Math.abs(getTotalByCategory(currentCategory)))}
          </div>
        </div>
      </div>

      <div className="expenses-content">
        <div className="expense-form-section">
          <GeneralExpenseForm 
            category={currentCategory} 
            onAddExpense={addGeneralExpense}
            categoryColor={categoryColors[currentCategory]}
          />
        </div>

        {filteredExpenses.length > 0 && (
          <div className="expenses-list-section">
            <GeneralExpenseList expenses={filteredExpenses} />
          </div>
        )}

        {filteredExpenses.length === 0 && (
          <div className="empty-category">
            <div className="empty-icon">
              {React.createElement(categoryIcons[currentCategory] || MoreHorizontal, { size: 48 })}
            </div>
            <h3>Nenhum registro em {generalCategories[currentCategory]}</h3>
            <p>Adicione seu primeiro registro nesta categoria</p>
          </div>
        )}

        <div className="navigation-tip">
          <p>💡 Para gastos do cartão de crédito, acesse a aba "Cartões"</p>
          <button onClick={() => navigateTo('cards')} className="nav-tip-btn">
            Ir para Cartões
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpensesScreen;