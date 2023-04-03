import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        reset: (state) => {
            state.value = 0;
        },
    },
});

const store = configureStore({
    reducer: counterSlice.reducer,
});
const { increment, reset } = counterSlice.actions;

export { store, increment, reset };