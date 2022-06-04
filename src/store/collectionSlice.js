import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

let result = [];

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setCollection(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setCollection, setStatus} = collectionSlice.actions;
export default collectionSlice.reducer;

export function fetchCollections() {
    return async function fetchCollectionThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const {data} = await axios.get(`https://testnets-api.opensea.io/api/v1/collections?format=json&limit=10&offset=0`);
            for (let item in data['collections'])
            {
                if(data['collections'][item]['primary_asset_contracts'][0] != null)
                {
                    result.push(data['collections'][item]['primary_asset_contracts'][0])
                }
            }
            dispatch(setCollection(result));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.IDLE));
        }
    };
}