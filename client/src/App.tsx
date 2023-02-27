import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import Root from './views/Root'
import store from './store' 
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import type {} from '@mui/x-date-pickers/themeAugmentation';

function App() {
  // Set up MUI theme
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    palette: {
      primary: {
        main: "#ffb500"
      },
      secondary: {
        main: "#ffd366"
      }
    }
  })


  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <Root />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
