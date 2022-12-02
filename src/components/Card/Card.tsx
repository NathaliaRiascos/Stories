import React from 'react'
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  CardBody,
  CardFooter,
  Button,
  Image
} from '@chakra-ui/react'

import { 
  BiEdit
} from 'react-icons/bi'

import { AiOutlineDelete } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { deleteStory } from '@/redux/features';
import { useAppDispatch } from '@/redux/hooks';

function CardComponent({ id, story, title, imgURL }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <Card w='full' bgColor='white' >
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Box>
          <Heading size='ms'>Segun Adebayo</Heading>
          <Text>Creator, Chakra UI</Text>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
  <CardBody>
    <Heading as='h1' size='ms'>{title}</Heading>
    <Text>
      { story }
    </Text>
  </CardBody>
  <Image
    objectFit='contain'
    src={imgURL}
    maxH='200px'
    alt='Chakra UI'
  />
  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button
      flex='1'
      variant='ghost'
      leftIcon={<BiEdit />}
      onClick={() => navigate(`/update/${id}`)}
    >
      Edit
    </Button>
    <Button 
      flex='1'
      variant='ghost'
      leftIcon={<AiOutlineDelete />}
      onClick={() => dispatch(deleteStory(id))}
    >
      Delete
    </Button>
  </CardFooter>
</Card>
  )
}

export default CardComponent