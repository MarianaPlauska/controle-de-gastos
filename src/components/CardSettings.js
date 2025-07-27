import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useCard } from '../contexts/CardContext';
import './CardSettings.css';

const CardSettings = ({ onClose }) => {
  const { cardData, updateCardData } = useCard();
  const [formData, setFormData] = useState({
    limit: cardData.limit,
    nextRecharge: cardData.nextRecharge,
    cardNumber: cardData.cardNumber,
    cardHolder: cardData.cardHolder,
    expiryDate: cardData.expiryDate
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving card data:', formData); // Debug
    updateCardData(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, value); // Debug
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Configurações do Cartão</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="limit">Limite do Cartão (R$)</label>
            <input
              type="number"
              id="limit"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nextRecharge">Próxima Recarga</label>
            <input
              type="date"
              id="nextRecharge"
              name="nextRecharge"
              value={formData.nextRecharge}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Número do Cartão</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="**** **** **** 1234"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardHolder">Nome do Titular</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="SEU NOME"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Data de Validade</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/AA"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardSettings; 