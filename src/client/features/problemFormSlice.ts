import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

import { api } from "../api/client";
import { RootState } from "../app/store";
import { TestCaseExample } from "../lib/types"; // delete this


export interface Testcase {
	id: string
	input: string;
	output: string
}
export interface ProblemFormState {
	id: string;
	title: string;
	description: string;
	difficulty: string;
	testcases: Testcase[]

}
export const ProblemFormInitailState: ProblemFormState = {
	id: "",
	title: "",
	description: "",
	difficulty: "",
	testcases: []
};

export const createProblem = createAsyncThunk(
	"/problem/createProblem",
	async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { title, description, difficulty, testcases } = store.problemform;   
            
			if (title === ""){
				alert("please fill the title");
				return;
			}

			const res = await api.post("/problem/create-problem", {
				title,
				description,
				difficulty,
				testcases
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("CToken")
				}
			});

			console.log('new problme contribution response: ', res.data)
			return res.data;
		} catch (error: any) {
			console.error("Error: ", (error as Error).message);
		}
	}
);

export const problemFormSlice = createSlice({
	name: "problemForm",
	initialState: ProblemFormInitailState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
		setDifficulty: (state, action: PayloadAction<string>) => {
			state.difficulty = action.payload;
		},
		addNewTestcase :(state) => {
			const newTestcase: Testcase = {
				id: uuidv4(),
				input: "",
				output: ""
			}
			const updatedTestcase = [...state.testcases];
			updatedTestcase.push(newTestcase);
			state.testcases = updatedTestcase;
		},
		setTestcasesInput: (state, action: PayloadAction<{ id: string, input: string }>) => {
			const { id, input} = action.payload;
			const updatedTestcase = state.testcases.map(testcase => (
				testcase.id === id ? {...testcase, input: input} : testcase
			))
			state.testcases = updatedTestcase;
		},
		setTestcasesOutput: (state, action: PayloadAction<{ id: string, output: string }>) => {
			const { id, output} = action.payload;
			const updatedTestcase = state.testcases.map(testcase => (
				testcase.id === id ? {...testcase, output: output} : testcase
			))
			state.testcases = updatedTestcase;
		},
		deleteTestcase: (state, action: PayloadAction<string>) => {
			const testcaseId = action.payload
			const updatedTestcase = state.testcases.filter(testcase => testcase.id !== testcaseId);
			state.testcases = updatedTestcase;
		}, 
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(createProblem.pending, (_, action) => {
	// 		console.log("status is pending", action.payload);
	// 	}), 
	// 		builder.addCase(createProblem.fulfilled, (_, action) => {
	// 			console.log("status is fulfilled", action.payload);
	// 		}),
	// 		builder.addCase(createProblem.rejected, (_, action) => {
	// 			console.log("status is rejected", action.payload);
	// 		});
	// },
});

export default problemFormSlice.reducer;
export const {
	setTitle,
	setDescription,
	setDifficulty,  
	addNewTestcase, 
	setTestcasesInput,
	setTestcasesOutput,
	deleteTestcase
} = problemFormSlice.actions;
