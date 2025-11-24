import React from 'react';
import * as S from './styles';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  return (
    <S.Container $size={size}>
      <S.Highlight>M</S.Highlight>
      <S.Text>y</S.Text>
      <S.Highlight>C</S.Highlight>
      <S.Text>ontrol</S.Text>
    </S.Container>
  );
};
