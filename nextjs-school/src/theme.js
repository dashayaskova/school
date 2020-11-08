import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fce4ec',
    },
    secondary: {
      main: '#90caf9',
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      'sans-serif',
    ].join(','),
  }
});

export default theme;
