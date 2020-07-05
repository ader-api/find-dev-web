import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #F5F6F8;
    --secondary-color: #E9EBF0;
    --tertiary-color: #5C6A95;

    --title-color: #090E45;
    --text-color: #05061C;

    --button-color: #303D8B;
    --link-color: #FE2E2C;

    --info-color: #dee2e6;
    --info-text-color: #090E45;

    --success-color: #b2ff9e;
    --success-text-color: #283618;

    --error-color: #ff686b;
    --error-text-color: #540b0e;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--primary-color);
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
  }

  body, input, button {
    font: 16px 'Ubuntu', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
    color: var(--title-color);
  }

  button {
    cursor: pointer;
  }

  .logo {
    width: 300px;
    object-fit: contain;

    @media(max-width: 575px) {
      width: 190px;
    }
  }
`;
