import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = id => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToChange = anecdotes.find(e => e.id === id)
    const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
    }
    const returnedAnecdote = await anecdoteService.update(id, changedAnecdote)
    const updatedAnecdotes = anecdotes.map(anecdote =>
      anecdote.id !== id ? anecdote : returnedAnecdote)
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export default anecdoteSlice.reducer
