import { createAsyncThunk } from '@reduxjs/toolkit'
import { Story } from '@/models/story.interface'
import { ref, push, child, update, remove } from "firebase/database"
import { db, storage, refStorage } from '@/config/firebase'

import { uploadBytesResumable, getDownloadURL} from 'firebase/storage';

export const createStory = createAsyncThunk('story/createStory', async (story: Story, thunkApi) => {
  try {
    const storageRef = refStorage(storage, `stories/${story.imgURL.name}`)
    const uploadTask = uploadBytesResumable(storageRef, story.imgURL)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
  async () => {
    const url = await getDownloadURL(uploadTask.snapshot.ref)
    console.log()
  
    push(child(ref(db),'stories'), {
      ...story,
      date: Date.now(),
      imgURL: url
    });
  })
    
    return 'succeeded'
  } catch (err) {
    console.log(err)
  }
})

export const editStory = createAsyncThunk('story/editStory', async (story: Story, thunkApi) => {
  try {
    const storageRef = refStorage(storage, `stories/${story.imgURL.name}`)
    const uploadTask = uploadBytesResumable(storageRef, story.imgURL)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
  async () => {
    const url = await getDownloadURL(uploadTask.snapshot.ref)
    console.log()
    update(ref(db,`stories/${story.id}`), {
      ...story,
      date: Date.now(),
      imgURL: url
    });
  })
    
    return 'succeeded'
  } catch (err) {
    console.log(err)
  }
})

export const deleteStory = createAsyncThunk('story/deleteStory', async (idStory: string, thunkApi) => {
  try { 
    remove(child(ref(db),`stories/${idStory}`))
    console.log('si')
    return 'succeeded'
  } catch (err) {
    console.log(err)
  }
})

