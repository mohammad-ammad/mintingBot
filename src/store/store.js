import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
import collectiveReducer from './collectiveSlice';
const store = configureStore({
    reducer: {
        collectionReducer,
        collectiveReducer
    },
});

export default store;