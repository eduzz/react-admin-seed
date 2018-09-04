import { ThemeVariables } from '@material-ui/core/styles/createMuiTheme';

export const primary = {
  light: '#6d6d6d',
  main: '#424242',
  dark: '#1b1b1b',
  contrastText: '#fff',
};

export const secondary = {
  light: '#4ec485',
  main: '#009358',
  dark: '#00642e',
  contrastText: '#fff',
};

const variables: ThemeVariables = {
  drawerWidth: 240,
  headerHeight: 56,
  headerHeightUpSm: 64,
  tabbarHeight: 48,
  contentPadding: 12,
  contentPaddingUpSm: 24,
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
  colors: {
    success: '#009358',
    error: '#dc3f53',
  }
};

export default variables;