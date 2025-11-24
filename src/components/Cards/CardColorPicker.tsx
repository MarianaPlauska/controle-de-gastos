import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';

const PickerContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ColorOption = styled.button<{ color: string; isSelected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
  background: ${({ color }) => color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }
`;

const gradients = [
    'linear-gradient(135deg, #1e1e1e 0%, #3a3a3a 100%)', // Black/Grey
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // Deep Sea
    'linear-gradient(135deg, #82269e 0%, #a43dbc 100%)', // Nubank Purple
    'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)', // Sunset
    'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)', // Green
    'linear-gradient(135deg, #c31432 0%, #240b36 100%)', // Red/Dark
    'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', // Blue
    'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', // Pink/Red
];

interface CardColorPickerProps {
    selectedColor: string;
    onSelectColor: (color: string) => void;
}

export const CardColorPicker: React.FC<CardColorPickerProps> = ({ selectedColor, onSelectColor }) => {
    return (
        <PickerContainer>
            {gradients.map((gradient) => (
                <ColorOption
                    key={gradient}
                    color={gradient}
                    isSelected={selectedColor === gradient}
                    onClick={() => onSelectColor(gradient)}
                    type="button"
                >
                    {selectedColor === gradient && <Check size={20} color="white" />}
                </ColorOption>
            ))}
        </PickerContainer>
    );
};
