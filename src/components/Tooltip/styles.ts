import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: var(--tertiary-color);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    opacity: 0;
    transition: opacity .4s;
    visibility: hidden;

    position: absolute;
    transform: translateX(-50%);
    bottom: calc(100% + 12px);
    left: 50%;
    color: var(--title-color);

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-style: solid;
      border-color: var(--tertiary-color) transparent;
      border-width: 6px 6px 0 6px;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
