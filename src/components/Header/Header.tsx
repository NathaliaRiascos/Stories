import React from 'react'
import { useAppDispatch } from '@/redux/hooks'
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  Center,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';

import { logout } from '@/redux/features'
import { Navbar } from '@/components'
import { AddIcon, CloseIcon, HamburgerIcon  } from '@chakra-ui/icons';
import { Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Box>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Logo</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            <Navbar />
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            variant={'solid'}
            bgGradient="linear(to-r, red.400,pink.400)"
            color="white"
            size={'sm'}
            mr={4}
            leftIcon={<AddIcon />}
            onClick={() => navigate('/add-story')}
          >
            Storie
          </Button>
          <Avatar
            size={'sm'}
          />
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <Navbar />
          </Stack>
        </Box>
      ) : null}
    </Box >
  )
}

export default Header