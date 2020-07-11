import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    logo: string;

    colors: {
      primary: string;
      secondary: string;
      tertiary: string;

      backgroundColor: string;
      titleColor: string;
      textColor: string;
      linkColor: string;
      buttonColor: string;

      infoColor: string;
      infoTextColor: string;

      successColor: string;
      successTextColor: string;

      errorColor: string;
      errorTextColor: string;
    }
  }
}
