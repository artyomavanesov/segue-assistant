import { configureStore } from '@reduxjs/toolkit';

import { reducer as configurationReducer } from './slices/configurationReducer';
import { reducer as sessionReducer } from './slices/sessionReducer';

export const store = configureStore({
  reducer: { session: sessionReducer, configuration: configurationReducer }
});
