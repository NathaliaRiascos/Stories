import { createAsyncThunk } from '@reduxjs/toolkit'
import { Story } from '@/models/story.interface'
import { ref, push, child, update, remove } from 'firebase/database'
import { db, storage, refStorage } from '@/config/firebase'

import { getDownloadURL, uploadBytes} from 'firebase/storage';

export const createStory = createAsyncThunk('story/createStory', async (story: Story, thunkApi) => {
  try {
    const name = Date.now() + '-' + story.imgURL.name 
    const storageRef = refStorage(storage, `stories/${name}`)
    const uploadTask = await uploadBytes(storageRef, story.imgURL)
    const url = await getDownloadURL(uploadTask.ref)

    push(child(ref(db),'stories'), {
      ...story,
      date: Date.now(),
      imgURL: url
    })
    return 'Success story create'
  } catch (err) {
    thunkApi.rejectWithValue('Oops could not be created')
  }
})

export const editStory = createAsyncThunk('story/editStory', async (story: Story, thunkApi) => {
  try {
    let url
    if (story.imgURL.name) {
      const name = Date.now() + '-' + story.imgURL.name 
      const storageRef = refStorage(storage, `stories/${name}`)
      const uploadTask = await uploadBytes(storageRef, story.imgURL)
      url = await getDownloadURL(uploadTask.ref)
    } else {
      url = story.imgURL
    }

    update(ref(db,`stories/${story.id}`), {
      ...story,
      date: Date.now(),
      imgURL: url
    });
    
    return 'Success story update'
  } catch (err) {
    thunkApi.rejectWithValue({
      type:'error',
      msg: 'Oops could not be updated'
    })
  }
})

export const deleteStory = createAsyncThunk('story/deleteStory', async (idStory: string, thunkApi) => {
  try { 
    remove(child(ref(db),`stories/${idStory}`))
    return 'Success story delete'
  } catch (err) {
    thunkApi.rejectWithValue('Oops could not be deleted')
  }
})

