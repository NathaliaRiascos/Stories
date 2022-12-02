import { createAsyncThunk } from '@reduxjs/toolkit'
import { Story } from '@/models/story.interface'
import { ref, push, child, update, remove } from 'firebase/database'
import { db, storage, refStorage } from '@/config/firebase'

import { uploadBytesResumable, getDownloadURL} from 'firebase/storage';

export const createStory = createAsyncThunk('story/createStory', async (story: Story, thunkApi) => {
  try {
    const storageRef = refStorage(storage, `stories/${story.imgURL.name}`)
    const uploadTask = uploadBytesResumable(storageRef, story.imgURL)
    const url = await getDownloadURL(uploadTask.snapshot.ref)
  
    push(child(ref(db),'stories'), {
      ...story,
      date: Date.now(),
      imgURL: url
    });
    
    return {
      type:'success',
      msg: 'Success story create'
    }
  } catch (err) {
    thunkApi.rejectWithValue({
      type:'error',
      msg: 'Oops could not be created'
    })
  }
})

export const editStory = createAsyncThunk('story/editStory', async (story: Story, thunkApi) => {
  try {
    let url
    if (story.imgURL.name) {
      const storageRef = refStorage(storage, `stories/${story.imgURL.name}`)
      const uploadTask = uploadBytesResumable(storageRef, story.imgURL)
      url = await getDownloadURL(uploadTask.snapshot.ref)
    } else {
      url = story.imgURL
    }

    update(ref(db,`stories/${story.id}`), {
      ...story,
      date: Date.now(),
      imgURL: url
    });
    
    return {
      type:'success',
      msg: 'Success story update'
    }
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
    console.log('si')
    return {
      type:'success',
      msg: 'Success story delete'
    }
  } catch (err) {
    thunkApi.rejectWithValue({
      type:'error',
      msg: 'Oops could not be deleted'
    })
  }
})

