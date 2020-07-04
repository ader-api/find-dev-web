import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

  max-width: 1200px;
  margin: auto;
  padding: 0 15px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  text-align: center;

  @media(max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  .logo {
    margin-bottom: 16px;
  }

  form {
    margin: 50px 0;
    width: 340px;

    a {
      color: var(--link-color);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color .2s;

      &:hover {
        color: ${shade(.2, '#FE2E2C')};
      }
    }
  }

  > img {
    width: 600px;

    @media(max-width: 768px) {
      width: 60%;
    }

    @media(max-width: 575px) {
      display: none;
    }
  }
`;
