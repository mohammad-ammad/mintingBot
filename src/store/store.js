import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
import collectiveReducer from './collectiveSlice';
import connectReducer from './ConnectSlice';
const store = configureStore({
    reducer: {
        collectionReducer,
        collectiveReducer,
        connectReducer
    },
});

export default store;