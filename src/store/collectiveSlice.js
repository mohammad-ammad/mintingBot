const { createSlice } = require('@reduxjs/toolkit');

const collectiveSlice = createSlice({
    name: 'collective',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            // state.pop(action.payload);
            return state.filter((item) => item != action.payload)
        },
    },
});

export const { add, remove } = collectiveSlice.actions;
export default collectiveSlice.reducer;