import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.secondary};

  ${(props) => props.isErrored && css`
    border: 2px solid ${(props) => props.theme.colors.errorColor};
  `}

  ${(props) => props.isFocused && css`
    border: 2px solid ${(props) => props.theme.colors.titleColor};
    color: ${(props) => props.theme.colors.titleColor};
  `}

  ${(props) => props.isFilled && css`
    color: ${(props) => props.theme.colors.titleColor};
  `}

  & + div {
    margin-top: 8px;
  }

  input {
    color: ${(props) => props.theme.colors.textColor};
    background: transparent;
    flex: 1;
    width: 100%;
    border: 0;

    &::placeholder {
      color: ${(props) => props.theme.colors.tertiary};
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
    color: ${(props) => props.theme.colors.errorColor};

    &:hover {
      cursor: pointer;
    }
  }

  span {
    background: ${(props) => props.theme.colors.errorColor};
    color: #fff;
    &::before {
      border-color: ${(props) => props.theme.colors.errorColor} transparent;
    }
  }
`;
