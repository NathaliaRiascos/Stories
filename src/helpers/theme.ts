import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    pink: {
      400: '#ED64A6'
    },
    red: {
      100: '#fed7d7',
      400: '#F56565',
      500: '#e53e3e'
    },
    green: {
      100: '#c6f6d5',
      500: '#38a169'
    },
    blue: {
      100: '#bee3f8',
      500: '#3182ce'
    },
    orange: {
      100: '#feebc8',
      500: '#dd6b20'
    }
  },
  styles: {
  }
})

export default theme
