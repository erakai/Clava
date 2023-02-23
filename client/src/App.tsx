import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'

import Root from './views/Root'
import store from './store' 

console.log('Initialized environment.')
// console.log("htis process????? " + process.env.PORT)
//dotenv.config()

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
