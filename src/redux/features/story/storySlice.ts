import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Story } from '@/models/story.interface'
import { createStory } from './thunks';

interface AuthState {
  story: Story | null
  stories: Story[] | null
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
  story: null,
  stories: [],
  status: 'idle'
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    saveStories(state, action){
      state.stories = action.payload
    },
    // getStoryById(state, action){
    //   state.story = state.stories?.filter(story => story.id === action.payload)[0]
    // }
  },
  extraReducers(builder) {
    builder.addCase(createStory.fulfilled, (state, action) => {
      state.status = action.payload
    })
    builder.addCase(createStory.rejected, (state, action) => {
      state.status = action.payload
    })
  }
})

export const getStoryById = (state, storyId) =>
  state.story.stories.find(story => story.id === storyId)

export const { saveStories } = storySlice.actions