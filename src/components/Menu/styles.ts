import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 250px;
  background: ${props => props.theme.colors.buttonColor};
  padding: 20px 15px 35px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  div {
    width: 100%;

    .userArea {
      display: flex;
      flex-direction: column;
      align-items: center;

      padding-bottom: 54px;
      border-bottom: 2px solid rgba(255, 255, 255, .1);

      img {
        height: 80px;
        width: 80px;
        object-fit: cover;
        border-radius: 50%;
        margin: 0 auto 16px auto;
      }

      strong {
        color: #fff;
        font-size: 18px;
        margin-bottom: 12px;
      }

      button {
        font-size: 14px;
        color: #fff;
        opacity: .7;
        transition: .2s ease all;

        &:hover {
          opacity: 1;
        }
      }
    }

    nav {
      margin-top: 32px;

      a {
        padding: 12px;
        border-radius: 20px;
        color: #fff;
        opacity: .7;
        transition: .2s ease all;

        &:hover {
          opacity: 1;
        }

        & + a {
          margin-top: 4px;
        }

        &.active {
          background: #fff;
          box-shadow: 0px 8px 20px 0 rgba(0,0,0,0.34);
          color: ${props => props.theme.colors.buttonColor};
          opacity: 1;
        }
      }
    }
  }

  a, button {
    color: #fff;
    text-decoration: none;
    background: transparent;
    border: 0;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      opacity: .9;

      svg {
        opacity: .9;
      }
    }
  }
`;
