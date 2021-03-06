import styled, { css } from 'styled-components';

interface ContainerProps {
  type: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 360px;
  padding: 16px 30px 16px 16px;
  box-shadow: 3px 3px 12px rgba(0,0,0,.2);
  border-radius: 10px;

  display: flex;

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin-right: 16px;
  }

  strong, p, svg {
    color: #111;
  }

  div {
    flex: 1;

    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }

  button {
    background: transparent;
    border: 0;
    color: inherit;

    position: absolute;
    right: 16px;
    top: 16px;
  }

  ${(props) => props.type === 'info' && css`
    background: ${(props) => props.theme.colors.infoColor};
    border-left: 10px solid ${(props) => props.theme.colors.infoTextColor};
  `}

  ${(props) => props.type === 'success' && css`
    background: ${(props) => props.theme.colors.successColor};
    border-left: 10px solid ${(props) => props.theme.colors.successTextColor};
  `}

  ${(props) => props.type === 'error' && css`
    background: ${(props) => props.theme.colors.errorColor};
    border-left: 10px solid ${(props) => props.theme.colors.errorTextColor};
  `}
`
