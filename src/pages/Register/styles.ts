import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: 1200px;
  margin: auto;
  padding: 0 15px;
`;

export const Header = styled.div`
  height: 64px;

  display: flex;
  align-items: center;

  img {
    height: 44px;
  }

  a {
    color: ${(props) => props.theme.colors.linkColor};
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(.2, '#FE2E2C')};

      svg {
        color: ${shade(.2, '#FE2E2C')};
      }
    }

    svg {
      color: ${(props) => props.theme.colors.linkColor};
      margin-right: 16px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: calc(100vh - 64px);
  width: 100%;
  text-align: center;

  @media(max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  form {
    margin: 50px 0;
    width: 340px;

    a {
      color: ${(props) => props.theme.colors.linkColor};
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
