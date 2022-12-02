import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Input,
  Image,
  Textarea,
  Stack,
  SimpleGrid,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createStory, getStoryById, editStory } from '@/redux/features'
import { useParams } from 'react-router-dom'

const initialState = {
  title: '',
  category: '',
  story: '',
  imgURL: ''
}

function AddOrStory() {
  const { id } = useParams()
  const storyState = useAppSelector(state => getStoryById(state, id))
  const [values, setValues] = useState(initialState)
  const dispatch = useAppDispatch()

  useEffect(() => { 
    if ( id ) {  
      setValues(storyState)
      console.log(id, storyState)
    } 
  }, [id])
  
  const {
    title,
    category,
    story,
    imgURL
  } = values

  const handleChange = ({ target }:  ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  const handleFile = ({ target }:  ChangeEvent<HTMLInputElement>) => {
    const file = target.files && target.files[0]
    console.log(values)
      setValues({
        ...values,
        [target.name]: file
      })  
  }

  const handleSubmit = (e: React.FormEvent | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (id ) dispatch(editStory(values))
    else dispatch(createStory(values))
    setValues(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid
        maxWidth={['sm', '2xl']}
        w='full'
        bgColor='white'
        columns={{ base: 1, sm: 2 }}
        spacing={4}
      >
        <Box p={5}>

          <Stack spacing={5}>
            <Heading as='h1' size='md'>{id? 'Edit Story' :'Add Story'}</Heading>

            <Box
              borderRadius='10'
              position='relative'
              h='200px'
            >
              <Box
                h='full'
                w='full'
                position='relative'
                alignItems="center"
                justifyContent='center'
                display="flex"
              >
                <Image
                  position='relative'
                  borderRadius='10'
                  src={typeof imgURL === 'string'? imgURL : URL.createObjectURL(imgURL)}
                  h='full'
                  w='full'
                  fallbackSrc='https://via.placeholder.com/150'
                />
                <Heading
                  fontSize="lg"
                  color="gray.700"
                  fontWeight="bold"
                  position='absolute'
                >
                  Select an Image
                </Heading>
              </Box>
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                onChange={handleFile}
                name='imgURL'
                accept="image/*"
              />
            </Box>
            <Input
              variant='filled'
              placeholder='Title'
              name='title'
              value={title || title}
              onChange={handleChange}
            />
            <Input
              variant='filled'
              name='category'
              placeholder='Category'
              value={category || category}
              onChange={handleChange}
            />
          </Stack>
        </Box>
        <Box p={5}>
          <Textarea
            minH='400px'
            resize='vertical'
            variant='filled'
            name='story'
            onChange={handleChange}
            value={story || story}
            mb={5}
            placeholder='Type your story'
          />
          <Button
            type='submit'
            w='full'
            bgGradient="linear(to-r, red.400,pink.400)"
            color='white'
            borderRadius='12'
          >Post</Button>
        </Box>
      </SimpleGrid>
    </form>
  )
}

export default AddOrStory