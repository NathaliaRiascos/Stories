import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const Links = [
  {
    path: '/',
    name: 'My Stories'
  },
];


const NavLink = ({ to, children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={to}>
    {children}
  </Link>
)

function Navbar() {
  return (
    <>
      {Links.map((link) => (
        <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
      ))}
    </>
  )
}

export default Navbar