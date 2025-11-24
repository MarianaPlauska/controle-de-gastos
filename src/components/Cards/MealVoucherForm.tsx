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
} from './MealVoucherForm.styles';
import styled from 'styled-components';

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const voucherSchema = z.object({
  company: z.string().min(3, 'Nome da empresa deve ter pelo menos 3 caracteres'),
  balance: z.string().min(1, 'Saldo é obrigatório'),
  dailyAllowance: z.string().optional(),
});

type VoucherFormData = z.infer<typeof voucherSchema>;

export const MealVoucherForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const addVoucher = useCardStore((state) => state.addVoucher);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<VoucherFormData>({
    resolver: zodResolver(voucherSchema)
  });

  const onSubmit = (data: VoucherFormData) => {
    const numericBalance = parseFloat(data.balance.replace(/[^0-9,.]/g, '').replace(',', '.'));
    const numericAllowance = data.dailyAllowance
      ? parseFloat(data.dailyAllowance.replace(/[^0-9,.]/g, '').replace(',', '.'))
      : undefined;

    addVoucher({
      company: data.company,
      balance: numericBalance,
      dailyAllowance: numericAllowance,
      color: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)' // Default color
    });

    reset();
    if (onClose) onClose();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Adicionar Vale</Title>

      <FormGroup>
        <Label>Empresa</Label>
        <Input
          {...register('company')}
          placeholder="Ex: Ticket Restaurante"
        />
        {errors.company && <ErrorMessage>{errors.company.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Saldo Atual</Label>
        <Input
          {...register('balance')}
          placeholder="Ex: 450.00"
        />
        {errors.balance && <ErrorMessage>{errors.balance.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Diária (Opcional)</Label>
        <Input
          {...register('dailyAllowance')}
          placeholder="Ex: 45.00"
        />
      </FormGroup>

      <Button type="submit">Salvar Vale</Button>
    </FormContainer>
  );
};
