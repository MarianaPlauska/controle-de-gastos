import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransactionStore } from '../../store/useTransactionStore';
import {
    FormContainer,
    Title,
    FormGroup,
    Label,
    Input,
    Button
} from './CardExpenseForm.styles';
import styled from 'styled-components';

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const expenseSchema = z.object({
    title: z.string().min(3, 'Descrição deve ter pelo menos 3 caracteres'),
    amount: z.string().min(1, 'Valor é obrigatório'),
    category: z.string().min(1, 'Categoria é obrigatória'),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface CardExpenseFormProps {
    cardId: string;
    onClose?: () => void;
}

export const CardExpenseForm: React.FC<CardExpenseFormProps> = ({ cardId, onClose }) => {
    const addTransaction = useTransactionStore((state) => state.addTransaction);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpenseFormData>({
        resolver: zodResolver(expenseSchema)
    });

    const onSubmit = (data: ExpenseFormData) => {
        const numericAmount = parseFloat(data.amount.replace(/[^0-9,.]/g, '').replace(',', '.'));

        addTransaction({
            title: data.title,
            amount: numericAmount,
            date: new Date().toISOString(),
            type: 'expense',
            category: data.category,
            cardId: cardId
        });

        reset();
        if (onClose) onClose();
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Title>Registrar Gasto</Title>

            <FormGroup>
                <Label>Descrição</Label>
                <Input
                    {...register('title')}
                    placeholder="Ex: Uber, Ifood, Amazon..."
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
                <Label>Valor</Label>
                <Input
                    {...register('amount')}
                    placeholder="Ex: 50.00"
                />
                {errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
                <Label>Categoria</Label>
                <Input
                    {...register('category')}
                    placeholder="Ex: Transporte, Alimentação..."
                />
                {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
            </FormGroup>

            <Button type="submit">Adicionar Gasto</Button>
        </FormContainer>
    );
};
