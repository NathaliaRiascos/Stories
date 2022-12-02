import React, { useEffect } from 'react'
import { ref, onValue,  } from 'firebase/database'
import { db } from '@/config/firebase'

import { Card } from '@/components'

import { Flex } from '@chakra-ui/react';

import { useAppDispatch } from '@/redux/hooks'

import { saveStories } from '@/redux/features';
import { useAppSelector } from '@/redux/hooks';
import { Story } from '../../models/story.interface';


function Stories() {
  const stories = useAppSelector((state) => state.story.stories)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storiesRef = ref(db, `/stories`)
    onValue(storiesRef, (snapshot) => {
      const temp: Story[] = []
      const data = snapshot.val();
      if ( data ) {
        Object.keys(data).forEach(key => temp.push({id: key, ...data[key]}))
        dispatch(saveStories(temp))
      } else {
        dispatch(saveStories([]))
      }
    });
  }, [])
    
  return (
    <Flex
      w='full'
      maxW='xl'
      direction='column'
      align='center'
      gap={14}
    >
      {
        stories.lenght? stories.map(({ title, story, id, imgURL}) => (
          <Card key={id} id={id} title={title} imgURL={imgURL} story={story} />
        ))
        : <p>Oops don't have any story, add a story</p>
      }
    </Flex>
  )
}

export default Stories