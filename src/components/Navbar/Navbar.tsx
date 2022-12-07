import { ReactNode } from 'react';
import {
  Link,
  useColorModeValue
} from '@chakra-ui/react';


const Links = [
  {
    path: '/',
    name: 'My Stories'
  },
];

interface Props {
  to: string;
  children: React.ReactElement | React.ReactElement[] | string
}

const NavLink = ({ to, children }: Props) => (
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
        <NavLink key={link.name} to={link.path}>{ link.name }</NavLink>
      ))}
    </>
  )
}

export default Navbar