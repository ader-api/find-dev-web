import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';

import { Container } from './styles';

interface ThemeProps {
  toggleTheme(): void
}

const ThemeSwitcher: React.FC<ThemeProps> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext)

  return (
    <Container>
      <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(.1, colors.secondary)}
        onColor={colors.buttonColor}
      />
    </Container>
  );
}

export default ThemeSwitcher;
