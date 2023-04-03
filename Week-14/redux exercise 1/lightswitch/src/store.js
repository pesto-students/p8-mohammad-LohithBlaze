import { createSlice, configureStore } from '@reduxjs/toolkit';

const lightSlice = createSlice({
    name: "lightSwitch",
    initialState: {
        isLightOn: true
    },
    reducers: {
        lightReducer: (state = initialState, action) => {
            return { ...state, isLightOn: !state.isLightOn };
        }
    },
});

const store = configureStore({
    reducer: lightSlice.reducer,
});

const { lightReducer } = lightSlice.actions;

export { store, lightReducer };
