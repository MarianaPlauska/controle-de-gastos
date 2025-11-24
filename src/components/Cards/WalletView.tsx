import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCardStore } from '../../store/useCardStore';
import { CreditCard } from './CreditCard';
import { MealVoucherCard } from './MealVoucherCard';
import { Modal } from '../UI/Modal';
import { CreditCardForm } from './CreditCardForm';
import { MealVoucherForm } from './MealVoucherForm';
import {
    Container,
    Section,
    SectionTitle,
    CardsGrid,
    AddCardButton
} from './WalletView.styles';

export const WalletView: React.FC = () => {
    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

    const { cards, vouchers } = useCardStore();

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <Container>
            <Plus size={32} />
            <span>Adicionar Cartão</span>
        </AddCardButton>
                </CardsGrid >
            </Section >

            <Section>
                <SectionTitle>Vales & Benefícios</SectionTitle>
                <CardsGrid>
                    {vouchers.map((voucher) => (
                        <MealVoucherCard
                            key={voucher.id}
                            company={voucher.company}
                            balance={formatCurrency(voucher.balance)}
                            dailyAllowance={voucher.dailyAllowance ? formatCurrency(voucher.dailyAllowance) : 'N/A'}
                            color={voucher.color}
                        />
                    ))}
                    <AddCardButton onClick={() => setIsVoucherModalOpen(true)}>
                        <Plus size={32} />
                        <span>Adicionar Vale</span>
                    </AddCardButton>
                </CardsGrid>
            </Section>

            <Modal isOpen={isCreditModalOpen} onClose={() => setIsCreditModalOpen(false)}>
                <CreditCardForm onClose={() => setIsCreditModalOpen(false)} />
            </Modal>

            <Modal isOpen={isVoucherModalOpen} onClose={() => setIsVoucherModalOpen(false)}>
                <MealVoucherForm onClose={() => setIsVoucherModalOpen(false)} />
            </Modal>
        </Container >
    );
};
