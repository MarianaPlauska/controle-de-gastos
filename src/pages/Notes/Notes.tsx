import React, { useState } from 'react';
import { Plus, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatters';
import './Notes.css';

export const Notes: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'income' | 'notes'>('income');

  const incomes: Array<{ id: string; description: string; amount: number; type: string; date: string }> = [];
  const notes: Array<{ id: string; title: string; content: string; date: string }> = [];

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="notes-page" style={{ background: theme.bg.primary }}>
      <header className="page-header">
        <h1 style={{ color: theme.text.primary }}>Controle Financeiro</h1>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'income' ? 'active' : ''}`}
          style={{
            background: activeTab === 'income' ? theme.purple.primary : theme.bg.card,
            color: activeTab === 'income' ? 'white' : theme.text.primary,
          }}
          onClick={() => setActiveTab('income')}
        >
          <DollarSign size={20} />
          Rendimentos
        </button>
        <button
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          style={{
            background: activeTab === 'notes' ? theme.purple.primary : theme.bg.card,
            color: activeTab === 'notes' ? 'white' : theme.text.primary,
          }}
          onClick={() => setActiveTab('notes')}
        >
          <FileText size={20} />
          Anotações
        </button>
      </div>

      {activeTab === 'income' && (
        <div className="income-section">
          <div className="total-income" style={{ background: theme.bg.card, boxShadow: theme.shadow }}>
            <div className="income-icon" style={{ background: theme.purple.light }}>
              <TrendingUp size={24} style={{ color: theme.purple.primary }} />
            </div>
            <div>
              <span style={{ color: theme.text.secondary }}>Total de Rendimentos</span>
              <h2 style={{ color: theme.text.primary }}>{formatCurrency(totalIncome)}</h2>
            </div>
          </div>

          <div className="section-header">
            <h3 style={{ color: theme.text.primary }}>Fontes de Renda</h3>
            <button className="add-btn" style={{ background: theme.purple.primary }}>
              <Plus size={20} />
            </button>
          </div>

          <div className="income-list">
            {incomes.length === 0 ? (
              <div className="empty-state" style={{ color: theme.text.secondary }}>
                <p>Nenhum rendimento registrado</p>
                <span style={{ fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                  Adicione suas fontes de renda
                </span>
              </div>
            ) : (
              incomes.map((income) => (
                <div 
                  key={income.id} 
                  className="income-item"
                  style={{ background: theme.bg.card, boxShadow: theme.shadow }}
                >
                  <div className="income-info">
                    <h4 style={{ color: theme.text.primary }}>{income.description}</h4>
                    <span style={{ color: theme.text.secondary }}>{income.type}</span>
                  </div>
                  <div className="income-amount" style={{ color: '#10b981' }}>
                    +{formatCurrency(income.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="notes-section">
          <div className="section-header">
            <h3 style={{ color: theme.text.primary }}>Minhas Anotações</h3>
            <button className="add-btn" style={{ background: theme.purple.primary }}>
              <Plus size={20} />
            </button>
          </div>

          <div className="notes-list">
            {notes.length === 0 ? (
              <div className="empty-state" style={{ color: theme.text.secondary }}>
                <p>Nenhuma anotação criada</p>
                <span style={{ fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                  Crie anotações para suas metas e lembretes
                </span>
              </div>
            ) : (
              notes.map((note) => (
                <div 
                  key={note.id} 
                  className="note-item"
                  style={{ background: theme.bg.card, boxShadow: theme.shadow }}
                >
                  <h4 style={{ color: theme.text.primary }}>{note.title}</h4>
                  <p style={{ color: theme.text.secondary }}>{note.content}</p>
                  <span style={{ color: theme.text.tertiary }}>{note.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
