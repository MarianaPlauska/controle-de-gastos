import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Bell, Plus, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';


const Reminders = () => {
  const { reminders, addReminder, removeReminder } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    type: 'payment'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReminder.title && newReminder.date) {
      addReminder(newReminder);
      setNewReminder({ title: '', description: '', date: '', type: 'payment' });
      setShowForm(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      payment: 'Pagamento',
      limit: 'Limite',
      general: 'Geral'
    };
    return types[type] || 'Geral';
  };

  return (
    <div className="reminders-section">
      <div className="section-header">
        <h3>
          <Bell size={20} />
          Lembretes
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-add"
        >
          <Plus size={16} />
          Adicionar
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="reminder-form">
          <input
            type="text"
            placeholder="Título do lembrete"
            value={newReminder.title}
            onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Descrição (opcional)"
            value={newReminder.description}
            onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
            rows="2"
          />
          <div className="form-row">
            <input
              type="date"
              value={newReminder.date}
              onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
              required
            />
            <select
              value={newReminder.type}
              onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
            >
              <option value="payment">Pagamento</option>
              <option value="limit">Limite</option>
              <option value="general">Geral</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Salvar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="reminders-list">
        {reminders.length === 0 ? (
          <p className="empty-state">Nenhum lembrete cadastrado</p>
        ) : (
          reminders.map(reminder => (
            <div key={reminder.id} className={`reminder-item ${reminder.type}`}>
              <div className="reminder-content">
                <div className="reminder-header">
                  <h4>{reminder.title}</h4>
                  <span className="reminder-type">{getTypeLabel(reminder.type)}</span>
                </div>
                {reminder.description && (
                  <p className="reminder-description">{reminder.description}</p>
                )}
                <div className="reminder-date">
                  <Calendar size={14} />
                  {formatDate(reminder.date)}
                </div>
              </div>
              <button
                onClick={() => removeReminder(reminder.id)}
                className="btn-remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reminders;