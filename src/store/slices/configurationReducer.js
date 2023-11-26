import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { database } from '../../services/firebase';

const initialState = {
  model: '',
  instructions: '',
  temperature: '',
  isLoading: false,
  error: false
};

export const updateConfiguration = createAsyncThunk('configuration/updateConfiguration', async (instructions) => {
  try {
    const configurationReference = doc(database, 'configuration', 'openai_generate_segway');
    await updateDoc(configurationReference, { instructions });
    return instructions;
  } catch (error) {
    console.error(error);
    return error;
  }
});

export const getConfiguration = createAsyncThunk('configuration/getConfiguration', async () => {
  try {
    const configurationReference = doc(database, 'configuration', 'openai_generate_segway');
    const configurationDocument = await getDoc(configurationReference);
    return configurationDocument.data();
  } catch (error) {
    console.error(error);
    return error;
  }
});

export const configurationReducer = createSlice({ name: 'configuration', initialState, extraReducers: {
    [getConfiguration.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [getConfiguration.fulfilled]: (state, action) => {
      const { payload } = action;
      state.model = payload.model;
      state.instructions = payload.instructions;
      state.temperature = payload.temperature;
      state.isLoading = false;
    },
    [getConfiguration.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [updateConfiguration.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [updateConfiguration.fulfilled]: (state, action) => {
      state.instructions = action.payload;
      state.isLoading = false;
    },
    [updateConfiguration.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
  }
});

export const { reducer } = configurationReducer;
