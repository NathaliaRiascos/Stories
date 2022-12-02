import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Story } from '@/models/story.interface'
import { createStory, editStory } from './thunks';

interface AuthState {
  story: Story | null
  stories: Story[] | null
  status: { type: 'idle' | 'pending' | 'success' | 'error', msg: string }
}

const initialState: AuthState = {
  story: null,
  stories: [],
  status: {type: 'idle', msg: ''}
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    saveStories(state, action){
      state.stories = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(createStory.fulfilled, (state, action) => {
      state.status = action.payload
    })
    builder.addCase(createStory.rejected, (state, action) => {
      state.status = action.payload
    })
    builder.addCase(editStory.fulfilled, (state, action) => {
      state.status = action.payload
    })
    builder.addCase(editStory.rejected, (state, action) => {
      state.status = action.payload
    })
  }
})

export const getStoryById = (state, storyId) =>
  state.story.stories.find(story => story.id === storyId)

export const { saveStories } = storySlice.actions