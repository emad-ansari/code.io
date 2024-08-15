import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "../types";


export const filterInitialState: FilterState= {
    easy: false,
	medium: false,
	hard: false
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
    	setFilterOptions: (state, action: PayloadAction<{option: string}>) => {
			const { option } = action.payload;
			let updatedState: FilterState = {...state};
			if (option === 'easy'){
				updatedState = {
					easy: !state.easy,
					medium : state.medium ? !state.medium : state.medium,
					hard: state.hard ? !state.hard : state.hard
				}
			}
			if (option === 'medium'){
				updatedState = {
					easy : state.easy ? !state.easy : state.easy,
					medium: !state.medium,
					hard: state.hard ? !state.hard : state.hard
				}
			}
			if (option === 'hard'){
				updatedState = {
					easy : state.easy ? !state.easy : state.easy,
					medium : state.medium ? !state.medium : state.medium,
					hard: !state.hard,
				}
			}			
			return updatedState;
		}

    }
})

export default filterSlice.reducer;
export const { setFilterOptions } = filterSlice.actions;