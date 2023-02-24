import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'

import Root from './views/Root'
import store from './store' 

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
        <CssBaseline />
        <Root />
      </ThemeProvider>
    </Provider>
  )
}

export default App
