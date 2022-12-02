import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  colors: {
    brand: {
      pri: '#E17614',
      sec: '#F09135',
      select: '#F88319',
      greyLigth: '#E2E8F0',
      dark: '#353C4A',
      light: '#FFFFF7'
    },
    pink: {
      400: '#ED64A6'
    },
    red: {
      400: '#F56565'
    }
  },
  styles: {
    global: (props: any) => ({
      '#root, html, body': {
        h: '100vh',
        w: '100%',
        color: mode('brand.dark', 'brand.light')(props)
      },
      '*::-webkit-scrollbar': {
        display: 'none'
      },
      body: {
        bg: mode('brand.light', 'brand.dark')(props)
      }
    })
  }
})

export default theme
