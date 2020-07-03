import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<IconBaseProps>;
}

const Button: React.FC<ButtonProps> = ({ icon: Icon, ...props }) => (
  <Container>
    <span>
      {Icon && <Icon size={20} />}
    </span>

    <button
      {...props}
    />
  </Container>
);

export default Button;
