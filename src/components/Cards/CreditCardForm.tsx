import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCardStore } from '../../store/useCardStore';
import {
  FormContainer,
  Title,
  FormGroup,
  Label,
  Input,
  Button
} from './CreditCardForm.styles';
import styled from 'styled-components';

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const cardSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  nickname: z.string().optional(),
  lastDigits: z.string().length(4, 'Deve ter exatamente 4 dígitos').regex(/^\d+$/, 'Apenas números'),
  limit: z.string().min(1, 'Limite é obrigatório'),
  brand: z.string().min(1, 'Bandeira é obrigatória'),
});

type CardFormData = z.infer<typeof cardSchema>;

export const CreditCardForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const addCard = useCardStore((state) => state.addCard);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema)
  });

  const onSubmit = (data: CardFormData) => {
    // Convert limit string to number (removing currency symbols if user typed them)
    const numericLimit = parseFloat(data.limit.replace(/[^0-9,.]/g, '').replace(',', '.'));

    addCard({
      name: data.name.toUpperCase(),
      nickname: data.nickname,
      lastDigits: data.lastDigits,
      limit: numericLimit,
      brand: data.brand,
      color: 'linear-gradient(135deg, #1e1e1e 0%, #3a3a3a 100%)' // Default color for now
    });

    reset();
    if (onClose) onClose();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Adicionar Cartão</Title>

      <FormGroup>
        <Label>Nome no Cartão</Label>
        <Input
          {...register('name')}
          placeholder="Ex: MARIANA PLAUSKA"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Apelido do Cartão (Opcional)</Label>
        <Input
          {...register('nickname')}
          placeholder="Ex: Cartão Black, Nubank..."
        />
      </FormGroup>

      <FormGroup>
        <Label>Últimos 4 dígitos</Label>
        <Input
          {...register('lastDigits')}
          placeholder="Ex: 4242"
          maxLength={4}
        />
        {errors.lastDigits && <ErrorMessage>{errors.lastDigits.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Limite</Label>
        <Input
          {...register('limit')}
          placeholder="Ex: 5000"
        />
        {errors.limit && <ErrorMessage>{errors.limit.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Bandeira</Label>
        <Input
          {...register('brand')}
          placeholder="Ex: Mastercard"
        />
        {errors.brand && <ErrorMessage>{errors.brand.message}</ErrorMessage>}
      </FormGroup>

      <Button type="submit">Salvar Cartão</Button>
    </FormContainer>
  );
};
