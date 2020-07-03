import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  border-radius: 30px;
  margin-top: 16px !important;

  display: flex;
  align-items: center;
  overflow: hidden;

  span {
    background: ${shade(.2, '#FE2E2C')};
    height: 56px;
    color: var(--primary-color);
    padding: 0 16px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    background: var(--button-color);
    color: var(--primary-color);
    border: 0;
    padding:  16px;
    height: 56px;
    width: 100%;
    font-weight: 500;
    transition: background .2s;

    &:hover {
      background: ${shade(.2, '#FE2E2C')};
    }
  }
`;
