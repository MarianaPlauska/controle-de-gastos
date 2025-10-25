import React, { useState } from 'react';
import styled from 'styled-components';
import { X, DollarSign, Calendar, Tag, Check } from 'lucide-react';
import { useCards } from '../cards/useCards';
import { ExpenseCategory } from '../../types';

// ============================================
// ESTILOS
// ============================================

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 32px 32px 0 0;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f4f4f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #18181b;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f4f4f5;
  border: none;
  color: #71717a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: #e4e4e7;
    color: #18181b;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #18181b;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e4e4e7;
  border-radius: 12px;
  font-size: 1rem;
  color: #18181b;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    background: #fafafa;
  }
  
  &::placeholder {
    color: #a1a1aa;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

const CategoryButton = styled.button<{ selected: boolean; color: string }>`
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? props.color : '#e4e4e7'};
  background: ${props => props.selected ? `${props.color}15` : 'white'};
  color: ${props => props.selected ? props.color : '#71717a'};
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.color};
    background: ${props => `${props.color}10`};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  margin-top: 1.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ============================================
// COMPONENTE
// ============================================

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onClose }) => {
  const { addExpense } = useCards();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'almoco' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    { id: 'almoco', label: 'Almoço', color: '#f97316' },
    { id: 'almoco_baratinho', label: 'Almoço Barato', color: '#10b981' },
    { id: 'lanche', label: 'Lanche', color: '#8b5cf6' },
    { id: 'fastfood', label: 'Fast-Food', color: '#ef4444' },
    { id: 'almoco_sobremesa', label: 'Almoço + Sobremesa', color: '#ec4899' },
    { id: 'sobremesa', label: 'Sobremesa', color: '#db2777' },
    { id: 'viver_vida', label: 'Viver a Vida', color: '#14b8a6' },
    { id: 'geral', label: 'Geral', color: '#71717a' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount) {
      return;
    }

    addExpense({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });

    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Adicionar Gasto</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                <Tag size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Descrição
              </Label>
              <Input
                type="text"
                placeholder="Ex: Almoço no restaurante"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <DollarSign size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Valor
              </Label>
              <Input
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Data
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Categoria</Label>
              <CategoryGrid>
                {categories.map((cat) => (
                  <CategoryButton
                    key={cat.id}
                    type="button"
                    selected={formData.category === cat.id}
                    color={cat.color}
                    onClick={() => setFormData({ ...formData, category: cat.id as ExpenseCategory })}
                  >
                    {formData.category === cat.id && <Check size={16} />}
                    {cat.label}
                  </CategoryButton>
                ))}
              </CategoryGrid>
            </FormGroup>

            <SubmitButton type="submit">
              <Check size={20} />
              Adicionar Gasto
            </SubmitButton>
          </form>
        </ModalContent>
      </Modal>
    </Overlay>
  );
};
