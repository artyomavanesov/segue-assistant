import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { database } from '../../services/firebase';

const initialState = {
  model: '',
  instructions: '',
  theme: '',
  isLoading: false,
  error: false
};

export const updateConfiguration = createAsyncThunk('configuration/updateConfiguration', async (configuration) => {
  try {
    const configurationReference = doc(database, 'configuration', 'openai_generate_segway');
    const { instructions, theme } = configuration;
    await updateDoc(configurationReference, { instructions, theme });
    return configuration;
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
      state.theme = payload.theme;
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
      const { payload } = action;
      state.instructions = payload.instructions;
      state.theme = payload.theme;
      state.isLoading = false;
    },
    [updateConfiguration.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
  }
});

export const { reducer } = configurationReducer;
