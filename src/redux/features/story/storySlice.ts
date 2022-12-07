import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Story } from '@/models/story.interface'
import { createStory, editStory, deleteStory } from './thunks';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';

interface StoryState {
  story: Story | null
  stories: Story[]
}

const initialState: StoryState = {
  story: null,
  stories: [],
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    saveStories(state, action){
      state.stories = action.payload
    },
    clearStoryState: () => initialState
  },
  extraReducers(builder) {
    builder.addCase(createStory.fulfilled, (state, action: PayloadAction<any>) => { 
      console.log(action.payload)
      toast.success(action.payload)
    })
    builder.addCase(createStory.rejected, (state, action: PayloadAction<any>) => {
      toast.error(action.payload)
    })
    builder.addCase(editStory.fulfilled, (state, action: PayloadAction<any>) => {
      toast.success(action.payload)
    })
    builder.addCase(editStory.rejected, (state, action: PayloadAction<any>) => {
      toast.error(action.payload)
    })
    builder.addCase(deleteStory.fulfilled, (state, action: PayloadAction<any>) => {
      toast.success(action.payload)
    })
    builder.addCase(deleteStory.rejected, (state, action: PayloadAction<any>) => {
      toast.error(action.payload)
    })
  }
})

export const getStoryById = (state: RootState, storyId: string) =>
  state.story.stories?.find(story => story.id === storyId)

export const { saveStories, clearStoryState } = storySlice.actions