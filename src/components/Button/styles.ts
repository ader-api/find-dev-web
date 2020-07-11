import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  border-radius: 30px;
  margin-top: 16px !important;

  display: flex;
  align-items: center;
  overflow: hidden;

  span {
    background: ${shade(.2, '#303D8B')};
    height: 56px;
    color: ${(props) => props.theme.colors.primary};
    padding: 0 16px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    background: ${(props) => props.theme.colors.buttonColor};
    color: ${(props) => props.theme.colors.primary};
    border: 0;
    padding:  16px;
    height: 56px;
    width: 100%;
    font-weight: 500;
    transition: background .2s;

    &:hover {
      background: ${shade(.2, '#303D8B')};
    }
  }
`;
