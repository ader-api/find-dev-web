import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
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

  ${(props) => props.isErrored && css`
    border: 2px solid var(--error-color);
  `}

  ${(props) => props.isFocused && css`
    border: 2px solid var(--title-color);
    color: var(--title-color);
  `}

  ${(props) => props.isFilled && css`
    color: var(--title-color);
  `}

  & + div {
    margin-top: 8px;
  }

  input {
    color: var(--text-color);
    background: transparent;
    flex: 1;
    width: 100%;
    border: 0;

    &::placeholder {
      color: var(--tertiary-color);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
    color: var(--error-color);

    &:hover {
      cursor: pointer;
    }
  }

  span {
    background: var(--error-color);
    color: #fff;
    &::before {
      border-color: var(--error-color) transparent;
    }
  }
`;
