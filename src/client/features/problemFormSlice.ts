import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/client";
import { RootState } from "../app/store";
import { v4 as uuidv4 } from 'uuid'


export interface Parameter {
	parameterId: string;
	name: string;
	type: string;
}


export interface ProblemFormState {
	id: string;
	title: string;
	description: string;
	difficulty: string;
	returnType: string;
	parameters: Parameter[];
}
export const ProblemFormInitailState: ProblemFormState = {
	id: "",
	title: "",
	description: "",
	difficulty: "",
	returnType: "",
	parameters: [],
};

export const createProblem = createAsyncThunk(
	"/problem/createProblem",
	async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { title, description, difficulty, parameters, returnType } =
				store.problemform;   
            const { testcases } = store.TestCaseForm;
			if (title === ""){
				alert("please fill the title");
				return;
			}

			const res = await api.post("/contribute/create-problem", {
				id: uuidv4(),
				title,
				description,
				difficulty,
				parameters,
				returnType,
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
		addParameter: (state, action: PayloadAction<Parameter>) => {
			let updatedValue = [...state.parameters];
			updatedValue.push(action.payload);
			state.parameters = updatedValue;
		},
		deleteParameter: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const filteredParameter = state.parameters.filter(
				(parameter) => parameter.parameterId !== id
			);
			state.parameters = filteredParameter;
		},
		setparameterName: (
			state,
			action: PayloadAction<{ id: string; name: string }>
		) => {
			const { id, name } = action.payload;
			const updatedParameter = state.parameters.map((parameter) =>
				parameter.parameterId === id ? { ...parameter, name: name } : parameter
			);
			state.parameters = updatedParameter;
		},
		setParameterType: (
			state,
			action: PayloadAction<{ id: string; type: string }>
		) => {
			const { id, type } = action.payload;
			const updatedParameter = state.parameters.map((parameter) =>
				parameter.parameterId === id ? { ...parameter, type } : parameter
			);
			state.parameters = updatedParameter;
		},
		setReturnType: (state, action: PayloadAction<string>) => {
			state.returnType = action.payload;
		},

		
		
        

	},
	extraReducers: (builder) => {
		builder.addCase(createProblem.pending, (_, action) => {
			console.log("status is pending", action.payload);
		}), 
			builder.addCase(createProblem.fulfilled, (_, action) => {
				console.log("status is fulfilled", action.payload);
			}),
			builder.addCase(createProblem.rejected, (_, action) => {
				console.log("status is rejected", action.payload);
			});
	},
});

export default problemFormSlice.reducer;
export const {
	setTitle,
	setDescription,
	setDifficulty,
	addParameter,
	setReturnType,
	deleteParameter,
	setparameterName,
	setParameterType,
    
} = problemFormSlice.actions;
