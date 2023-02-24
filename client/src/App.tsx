import dotenv from 'dotenv'
console.log('Initialized environment.')
console.log("htis process????? " + dotenv)
console.log(dotenv)
console.log(process.env)
// console.log(import.meta.env.MODE)
dotenv.config()
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
