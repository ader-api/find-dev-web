import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
`;

export const Content = styled.main`
  flex: 1;

  overflow-x: hidden;
  overflow-y: scroll;
`;

export const Header = styled.header`
  height: 64px;
  width: 100%;
  background: ${(props) => props.theme.colors.secondary};
  margin-bottom: 30px;

  a {
    color: ${props => props.theme.colors.linkColor};
    text-decoration: none;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(.2, '#FE2E2C')};
    }

    svg {
      margin: 0 8px 0 32px;
    }
  }
`;

export const HeaderContent = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 5px 30px;

  display: flex;
  align-items: center;

  img {
    height: 32px;
  }
`;

export const ProfileContent = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: auto;
  margin-bottom: 30px;

  header {
    display: flex;

    border-radius: 16px;
    background-color: ${(props) => props.theme.colors.secondary};

    img {
      border-radius: 16px 0 0 16px;
      height: 270px;
      width: 270px;
      object-fit: cover;
    }

    main {
      padding: 32px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > div > div {
        display: flex;
        align-items: center;

        margin-bottom: 16px;
      }

      h1 {
        margin-right: 8px;
      }

      span {
        margin-left: 8px;
        padding: 2px 8px;
        text-align: center;
        border-radius: 16px;
        text-transform: capitalize;
        font-weight: 700;
      }

      .available {
        border: 2px solid ${props => props.theme.colors.successColor};
        color: ${props => props.theme.colors.successColor};
      }

      .unavailable {
        border: 2px solid ${props => props.theme.colors.errorColor};
        color: ${props => props.theme.colors.errorColor};
      }

      .role {
        font-size: 20px;
        margin-bottom: 8px;
      }

      .location {
        margin-bottom: 8px;
      }

      .socials {
        display: flex;
        align-items: center;

        a {
          text-decoration: none;
          border-radius: 50%;
          color: ${props => props.theme.colors.linkColor};
          padding: 8px;

          & + a {
            margin-left: 8px;
          }
        }
      }
    }
  }

  body {
    div {
      border-radius: 16px;
      padding: 32px;
      margin-top: 16px;
      background-color: ${(props) => props.theme.colors.secondary};

      h2 {
        margin-bottom: 16px;
      }
    }
  }
`;

export const Techs = styled.div``;
