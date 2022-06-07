import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

let result = [];

const connectSlice = createSlice({
    name: 'connect',
    initialState: {
        account: [],
        isActive:false,
        status: STATUSES.IDLE,
    },
    reducers: {
        setAccount(state, action) {
            state.account = action.payload;
        },
        setIsActive(state, action) {
            state.isActive = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setAccount, setStatus, setIsActive} = connectSlice.actions;
export default connectSlice.reducer;

export function fetchUser() {
    return async function fetchUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            if(window.ethereum)
            {
                const result = await window.ethereum.request({method:'eth_requestAccounts'});
                dispatch(setAccount(result[0]));

                try {
                    const {data} = await axios.get(`https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=0xc1f15B359Deb637324e9198e42E2ebAEdD29cd01&format=json&include_orders=false&limit=20&offset=0&order_direction=desc&owner=${result[0]}`)
                    if(data['assets'].length > 0)
                    {
                        dispatch(setIsActive(true))
                    }
                } catch (error) {
                    console.log(error)
                    dispatch(setStatus(STATUSES.IDLE));
                }
            }
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.IDLE));
        }
    };
}