import logo from '../../assets/logo-dark.svg';
import { shade } from 'polished';

export default {
  title: 'dark',
  logo: `${logo}`,

  colors: {
    primary: '#F5F6F8',
    secondary: '#05082b',
    tertiary: '#5C6A95',

    backgroundColor: shade(.5, '#090E45'),
    titleColor: '#E9EBF0',
    textColor: '#F5F6F8',
    linkColor: '#FE2E2C',
    buttonColor: '#303D8B',

    infoColor: '#dee2e6',
    infoTextColor: '#090E45',

    successColor: '#b2ff9e',
    successTextColor: '#283618',

    errorColor: '#ff686b',
    errorTextColor: '#540b0e',
  },
}
