import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import { Header } from '@/components'
import { Box, Flex } from '@chakra-ui/react';

function App() {
  return (
    <Box
      bgColor='#f2f2f2'
      minH='100vh'
      w='full'
      px={4}
    >
      <Header />

      <Flex
        minH='100vh'
        align='center'
        justify='center'
      >
      <Outlet />
      </Flex>
    </Box>
  )
}

export default App
