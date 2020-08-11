import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h1 {
      margin-bottom: 21px;
    }

    button {
      border: 0;
      color: inherit;
      background: none;
    }
  }
`;
