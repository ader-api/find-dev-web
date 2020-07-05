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

  div {
    flex: 1;

    strong, p, svg {
      color: inherit;
    }

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
    background: var(--info-color);
    border-left: 10px solid var(--info-text-color);
  `}

  ${(props) => props.type === 'success' && css`
    background: var(--success-color);
    border-left: 10px solid var(--success-text-color);
  `}

  ${(props) => props.type === 'error' && css`
    background: var(--error-color);
    border-left: 10px solid var(--error-text-color);
  `}
`
