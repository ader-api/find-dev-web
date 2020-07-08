import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: calc(100vh - 96px);

  max-width: 1200px;
  margin: 48px auto;
  padding: 0 15px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 40px;

  a {
    color: var(--link-color);
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(.2, '#FE2E2C')};

      svg {
        color: ${shade(.2, '#303D8B')};
      }
    }

    svg {
      color: var(--button-color);
      margin-right: 16px;
    }
  }
`;

export const Content = styled.div`
  width: 70%;
  margin: auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  @media(max-width: 575px) {
    width: 90%;
  }

  h1 {
    margin-bottom: 21px;
  }
`;
