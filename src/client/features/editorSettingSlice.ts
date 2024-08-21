import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingState } from '../types'

export const  settingInitialState: SettingState = {
    isOpen: false 
}

export const editorSettingSlice = createSlice({
    name: 'setting',
    initialState: settingInitialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})


export default editorSettingSlice.reducer;
export const { setIsOpen } = editorSettingSlice.actions;