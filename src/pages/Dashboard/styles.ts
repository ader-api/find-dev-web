import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
`;

export const Content = styled.main`
  flex: 1;
`;

export const Header = styled.header`
  height: 64px;
  background: ${(props) => props.theme.colors.secondary};
  margin-bottom: 30px;
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

export const DashboardContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 0 30px;

  form {
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
    padding-bottom: 16px;
    margin-bottom: 16px;

    display: flex;
    justify-content: space-between;

    > div {
      flex: 1;
    }

    main {
      display: flex;
      align-items: center;

      div {
        max-width: 254px;
        width: 100%;
        margin-top: 0 !important;

        @media(max-width: 575px) {
          max-width: 100%;
        }
      }
    }

    h1 {
      margin-bottom: 21px;
    }
  }

  p, time {
    color: #7F808C;
  }
`;

export const DevelopersContent = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  row-gap: 16px;
  margin-top: 32px;

  @media(max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }

  a {
    text-decoration: none;
  }
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

      > div > div {
        display: flex;
        align-items: center;

        margin-bottom: 4px;
      }

      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 16px;
      }

      strong {
        font-size: 18px;
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

      svg {
        margin-right: 4px;
        color: ${props => props.theme.colors.linkColor};
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
