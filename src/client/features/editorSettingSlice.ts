import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingState } from '../types'

export const  settingInitialState: SettingState = {
    fontSize: 15,
    theme: 'vs-dark',
    isFullScreen: false
}

export const editorSettingSlice = createSlice({
    name: 'setting',
    initialState: settingInitialState,
    reducers: {
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;    
        },
        setFullScreen: (state, action: PayloadAction<boolean>) => {
            state.isFullScreen = action.payload;
        }

    }
})


export default editorSettingSlice.reducer;
export const { setFontSize, setTheme } = editorSettingSlice.actions;