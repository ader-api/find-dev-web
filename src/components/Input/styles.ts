import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid var(--secondary-color);

  ${(props) => props.isFocused && css`
    border: 2px solid var(--title-color);
    color: var(--title-color);
  `}

  ${(props) => props.isFilled && css`
    color: var(--button-color);
  `}

  & + div {
    margin-top: 8px;
  }

  input {
    color: var(--text-color);
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: var(--tertiary-color);
    }
  }

  svg {
    margin-right: 16px;
  }
`;
