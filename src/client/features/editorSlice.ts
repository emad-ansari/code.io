import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorState } from "../types";
import { javascriptBoilerPlate, javaBoilerPlate } from "../../utils/boilerPlates";

export const editorSliceInitialState: EditorState = {
    isFullScreen: false,
    language: 'java',
    boilerPlateCode: ''
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState: editorSliceInitialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        toggleFullScreen: (state, action: PayloadAction<boolean>) => {
			state.isFullScreen = action.payload;
		},
        setBoilerPlateCode: (state, action: PayloadAction<string>) => {
            console.log('being called...')
            const languageType= action.payload;

            if (languageType === 'javascript'){
                state.boilerPlateCode = javascriptBoilerPlate;
            }
            if (languageType === 'cpp'){

            }
            if (languageType === 'java') {
                state.boilerPlateCode = javaBoilerPlate;

            }
            if (languageType === 'go'){

            }
            if (languageType === 'rust'){
                
            }
            console.log('boiler code : ', state.boilerPlateCode)

        }
    },
    
});

export default editorSlice.reducer;
export const { setLanguage, toggleFullScreen, setBoilerPlateCode} = editorSlice.actions;
