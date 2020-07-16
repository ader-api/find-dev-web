import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  height: 64px;
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.1);
  margin-bottom: 32px;
`;

export const HeaderContent = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 0 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;

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
  }
`

export const DashboardContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;

  form {
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
    padding-bottom: 16px;
    margin-bottom: 16px;

    > div {
      max-width: 254px;
    }

    h1 {
      margin-bottom: 21px;
    }
  }
`;

export const ResultContent = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  row-gap: 16px;
  margin-top: 32px;
`;

export const Developer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 8px;
  padding: 8px 16px 16px;
  transition: .3s ease all;

  display: flex;
  align-items: center;

  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  main {
    flex: 1;

    header {
      display: flex;
      margin-bottom: 8px;

      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 16px;
      }
    }
  }

  > svg {
    color: ${props => props.theme.colors.tertiary};
  }
`;

export const Techs = styled.div`
  margin-top: 8px;

  display: flex;
  align-items: center;

  p {
    position: relative;

    & + p {
      margin-left: 16px;

      &:before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        left: -11px;
        bottom: 5px;
        background: ${props => props.theme.colors.linkColor};
        border-radius: 6px;
      }
    }
  }
`;
