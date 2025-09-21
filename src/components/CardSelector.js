import React, { useState } from 'react';
import { useCard } from '../contexts/CardContext';
import { CreditCard, Plus, Trash2, Edit3 } from 'lucide-react';


const CardSelector = () => {
  const { cards, activeCardId, switchCard, addCard, deleteCard, getTotalSpent, getAvailableLimit } = useCard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    limit: '',
    color: 'blue'
  });

  const cardColors = [
    { value: 'red', label: 'Vermelho', color: '#dc2626' },
    { value: 'blue', label: 'Azul', color: '#2563eb' },
    { value: 'green', label: 'Verde', color: '#16a34a' },
    { value: 'purple', label: 'Roxo', color: '#9333ea' },
    { value: 'orange', label: 'Laranja', color: '#ea580c' },
    { value: 'pink', label: 'Rosa', color: '#db2777' },
    { value: 'gray', label: 'Cinza', color: '#6b7280' }
  ];

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.name && newCard.limit) {
      const cardId = addCard({
        ...newCard,
        limit: parseFloat(newCard.limit)
      });
      switchCard(cardId);
      setNewCard({ name: '', limit: '', color: 'blue' });
      setShowAddForm(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="card-selector">
      <div className="section-header">
        <h3>
          <CreditCard size={20} />
          Meus Cartões
        </h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-add"
        >
          <Plus size={16} />
          Novo Cartão
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCard} className="add-card-form">
          <input
            type="text"
            placeholder="Nome do cartão"
            value={newCard.name}
            onChange={(e) => setNewCard({...newCard, name: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Limite (R$)"
            value={newCard.limit}
            onChange={(e) => setNewCard({...newCard, limit: e.target.value})}
            required
            min="0"
            step="0.01"
          />
          <div className="color-selector">
            <label>Escolha a cor do cartão:</label>
            <div className="color-options">
              {cardColors.map(color => (
                <div
                  key={color.value}
                  className={`color-option ${newCard.color === color.value ? 'selected' : ''}`}
                  onClick={() => setNewCard({...newCard, color: color.value})}
                >
                  <div 
                    className="color-circle"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="color-name">{color.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Criar Cartão</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="cards-grid">
        {cards.map(card => {
          const spent = getTotalSpent(card.id);
          const available = getAvailableLimit(card.id);
          const colorInfo = cardColors.find(c => c.value === card.color);
          
          return (
            <div 
              key={card.id}
              className={`card-item ${activeCardId === card.id ? 'active' : ''}`}
              onClick={() => switchCard(card.id)}
              style={{ borderColor: colorInfo?.color }}
            >
              <div className="card-header">
                <div className="card-info">
                  <h4>{card.name}</h4>
                  <div 
                    className="card-color-indicator"
                    style={{ backgroundColor: colorInfo?.color }}
                  />
                </div>
                {cards.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCard(card.id);
                    }}
                    className="btn-delete"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="label">Limite:</span>
                  <span className="value">{formatCurrency(card.limit)}</span>
                </div>
                <div className="stat">
                  <span className="label">Gasto:</span>
                  <span className="value spent">{formatCurrency(spent)}</span>
                </div>
                <div className="stat">
                  <span className="label">Disponível:</span>
                  <span className="value available">{formatCurrency(available)}</span>
                </div>
              </div>

              <div className="usage-bar">
                <div 
                  className="usage-fill"
                  style={{ 
                    width: `${Math.min((spent / card.limit) * 100, 100)}%`,
                    backgroundColor: colorInfo?.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSelector;