import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CardVisual } from '../../components/CardVisual/CardVisual';
import { CardEditor } from '../../components/CardEditor/CardEditor';
import { ExpenseForm } from '../../components/ExpenseForm/ExpenseForm';
import { AddCardModal } from '../../components/AddCardModal/AddCardModal';
import { useCards } from '../../contexts/CardsContext';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './Cards.css';

export const Cards: React.FC = () => {
  const { cards, activeCard, activeCardId, expenses, addCard, deleteCard, switchCard, updateCard, deleteExpense, getCardStats } = useCards();
  const { theme } = useTheme();
  const [showEditor, setShowEditor] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const stats = getCardStats();

  const categoryLabels: Record<string, string> = {
    almoco: 'Almoço',
    lanche: 'Lanche',
    besteira: 'Besteira',
    compra_especial: 'Compra Especial',
  };

  return (
    <div className="cards-page" style={{ background: theme.bg.primary }}>
      <header className="page-header">
        <h1 style={{ color: theme.text.primary }}>Meus Cartões</h1>
        <button 
          className="add-card-btn"
          style={{ background: theme.purple.primary }}
          onClick={() => setShowAddCard(true)}
          aria-label="Adicionar novo cartão"
        >
          <Plus size={20} />
        </button>
      </header>

      <div className="wallet-container">
        {cards.map((card, index) => {
          const isActive = activeCardId === card.id;
          const colorMap: Record<string, string> = {
            purple: '#8b5cf6',
            blue: '#3b82f6',
            green: '#10b981',
            orange: '#f97316',
            pink: '#ec4899',
            red: '#ef4444',
            yellow: '#eab308',
            teal: '#14b8a6',
          };
          const cardColor = colorMap[card.color] || colorMap.purple;
          
          return (
            <div
              key={card.id}
              className={`wallet-card ${isActive ? 'active' : ''}`}
              style={{
                background: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
                transform: isActive ? 'translateY(0) scale(1)' : `translateY(${index * 20}px) scale(0.95)`,
                zIndex: isActive ? 100 : cards.length - index,
                opacity: isActive ? 1 : 0.7,
              }}
              onClick={() => switchCard(card.id)}
            >
              <div className="wallet-card-content">
                <div className="wallet-card-header">
                  <span className="wallet-card-name">{card.name}</span>
                  {cards.length > 1 && isActive && (
                    <button
                      className="delete-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Excluir o cartão "${card.name}"?`)) {
                          deleteCard(card.id);
                        }
                      }}
                      aria-label="Excluir cartão"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="wallet-card-limit">
                  Limite: {formatCurrency(card.limit)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-details">
        {/* Barra de Progresso FORA do cartão */}
        <div className="usage-bar-section" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
          <div className="usage-header">
            <span style={{ color: theme.text.secondary, fontSize: '0.875rem', fontWeight: 600 }}>
              Uso do Limite
            </span>
            <span style={{ color: theme.text.primary, fontSize: '1.125rem', fontWeight: 700 }}>
              {stats.usagePercentage.toFixed(0)}%
            </span>
          </div>
          <div className="external-usage-bar">
            <div 
              className="external-usage-fill"
              style={{ 
                width: `${Math.min(stats.usagePercentage, 100)}%`,
                background: stats.usagePercentage >= 90 ? '#ef4444' : stats.usagePercentage >= 75 ? '#f97316' : '#10b981'
              }}
            />
          </div>
          <div className="usage-footer">
            <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>
              Disponível: {formatCurrency(stats.availableLimit)}
            </span>
            <span style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>
              Gasto: {formatCurrency(stats.totalSpent)}
            </span>
          </div>
        </div>

        <CardVisual 
          card={activeCard} 
          onSettingsClick={() => setShowEditor(true)}
        />
        
        <div className="card-stats" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
          <div className="stat-row">
            <span style={{ color: theme.text.secondary }}>Limite</span>
            <span style={{ color: theme.text.primary, fontWeight: 700 }}>
              {formatCurrency(activeCard.limit)}
            </span>
          </div>
          <div className="stat-row">
            <span style={{ color: theme.text.secondary }}>Disponível</span>
            <span style={{ color: '#10b981', fontWeight: 700 }}>
              {formatCurrency(stats.availableLimit)}
            </span>
          </div>
          <div className="stat-row">
            <span style={{ color: theme.text.secondary }}>Gasto</span>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>
              {formatCurrency(stats.totalSpent)}
            </span>
          </div>
        </div>

        <button 
          className="add-expense-btn"
          style={{ background: theme.purple.primary }}
          onClick={() => setShowExpenseForm(true)}
        >
          <Plus size={20} />
          Adicionar Gasto
        </button>

        {expenses.length > 0 && (
          <div className="expenses-section">
            <h3 style={{ color: theme.text.primary, fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
              Gastos Recentes
            </h3>
            <div className="expenses-list">
              {expenses.map((expense) => (
                <div 
                  key={expense.id} 
                  className="expense-card"
                  style={{ background: theme.bg.card, boxShadow: theme.shadow }}
                >
                  <div className="expense-content">
                    <div className="expense-header">
                      <h4 style={{ color: theme.text.primary }}>{expense.description}</h4>
                      <span className="expense-amount" style={{ color: '#ef4444' }}>
                        -{formatCurrency(expense.amount)}
                      </span>
                    </div>
                    <div className="expense-meta">
                      <span className="expense-category" style={{ color: theme.text.secondary }}>
                        {categoryLabels[expense.category]}
                      </span>
                      <span className="expense-date" style={{ color: theme.text.tertiary }}>
                        {formatDate(expense.date)}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="delete-expense-btn"
                    style={{ color: theme.text.tertiary }}
                    onClick={() => deleteExpense(expense.id)}
                    aria-label="Excluir gasto"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showEditor && (
        <CardEditor
          card={activeCard}
          onSave={(updates) => updateCard(activeCard.id, updates)}
          onClose={() => setShowEditor(false)}
        />
      )}

      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}

      {showAddCard && (
        <AddCardModal
          onAdd={(cardData) => {
            const newId = addCard(cardData);
            switchCard(newId);
          }}
          onClose={() => setShowAddCard(false)}
        />
      )}
    </div>
  );
};
