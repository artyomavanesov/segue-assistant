import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"; 
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { database } from '../../services/firebase';

const initialState = {
  id: '',
  userMessage: '',
  assistantMessage: '',
  isListening: false,
  isLoading: false,
  error: false
};

export const subscribeToSessions = createAsyncThunk('session/subscribeToSessions', async (id, { dispatch }) => {
  try {
    onSnapshot(doc(database, 'sessions', id), (document) => {
      const { assistantMessage } = document.data();
      assistantMessage && dispatch({ type: 'session/setAssistantMessage', payload: assistantMessage });
    });
  } catch (error) {
    console.error(error);
    return error;
  }
});

export const submitUserMessage = createAsyncThunk('session/submitUserMessage', async (content, { dispatch }) => {
  try {
    const sessionReference = doc(collection(database, 'sessions'));
    const sessionDetails = { assistantMessage: '', id: sessionReference.id, userMessage: content };
    await setDoc(sessionReference, sessionDetails);
    dispatch(subscribeToSessions(sessionReference.id));
    return sessionDetails;
  } catch (error) {
    console.error(error);
    return error;
  }
});

const sessionReducer = createSlice({ name: 'session', initialState,
  reducers: {
    setAssistantMessage: (state, action) => {
      state.assistantMessage = action.payload;
      state.isLoading = false;
    }
  },
  extraReducers: {
    [subscribeToSessions.fulfilled]: (state) => {
      state.isListening = true;
    },
    [subscribeToSessions.rejected]: (state, action) => {
      state.isListening = false;
      state.error = action.error.message;
    },
    [submitUserMessage.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [submitUserMessage.fulfilled]: (state, action) => {
      state.id = action.payload.id;
      state.userMessage = action.payload.userMessage;
    },
    [submitUserMessage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
}});

export const { reducer } = sessionReducer;
