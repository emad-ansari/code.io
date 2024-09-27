import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingState } from '../types'

export const  settingInitialState: SettingState = {
    isOpen: false, 
    fontSize: 15,
    theme: 'vs-dark',
    isFullScreen: false
}

export const editorSettingSlice = createSlice({
    name: 'setting',
    initialState: settingInitialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
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
export const { setIsOpen, setFontSize, setTheme } = editorSettingSlice.actions;