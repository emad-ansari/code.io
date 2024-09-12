import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { RootState } from "../app/store";

export interface TestCase {
	id: string;
	inputs: {
		name: string;
		type: string;
		value: string;
	}[];
	output: {
		type: string;
		value: string;
	};
}
export interface Parameter {
	id: string;
	name: string;
	type: string;
}

export interface ProblemFormState {
	title: string;
	description: string;
	difficulty: string;
	returnType: string;
	parameters: Parameter[];
	testcases: TestCase[];
}
export const ProblemFormInitailState: ProblemFormState = {
	title: "",
	description: "",
	difficulty: "Easy",
	returnType: "",
	parameters: [],
	testcases: [
		{
			id: "1",
			inputs: [{ name: "", type: "", value: "" }],
			output: {
				type: "",
				value: "",
			},
		},
		{
			id: "2",
			inputs: [{ name: "", type: "", value: "" }],
			output: {
				type: "",
				value: "",
			},
		},
	],
};

export const createProblem = createAsyncThunk(
	"/problem/createProblem",
	async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { title, description, difficulty, parameters, returnType } =
				store.problemform;

			const res = await client.post("/problem/create-problem", {
				title,
				description,
				difficulty,
				parameters,
				returnType,
			});
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
			console.log("difficulty: ", action.payload);
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
				(parameter) => parameter.id !== id
			);
			state.parameters = filteredParameter;
		},
		setparameterName: (
			state,
			action: PayloadAction<{ id: string; name: string }>
		) => {
			const { id, name } = action.payload;
			const updatedParameter = state.parameters.map((parameter) =>
				parameter.id === id ? { ...parameter, name: name } : parameter
			);
			state.parameters = updatedParameter;
		},
		setParameterType: (
			state,
			action: PayloadAction<{ id: string; type: string }>
		) => {
			const { id, type } = action.payload;
			const updatedParameter = state.parameters.map((parameter) =>
				parameter.id === id ? { ...parameter, type } : parameter
			);
			state.parameters = updatedParameter;
		},
		setReturnType: (state, action: PayloadAction<string>) => {
			state.returnType = action.payload;
		},

		addNewTestCase: (state, action: PayloadAction<TestCase>) => {
			let updateTestCase = [...state.testcases];
			updateTestCase.push(action.payload);
			state.testcases = updateTestCase;
		},
		setTestCaseName: (
			state,
			action: PayloadAction<{ testcaseId: string; name: string }>
		) => {
			const { testcaseId, name } = action.payload;
			const updatedTestcases = state.testcases.map((testcase) =>
				testcase.id === testcaseId
					? { ...testcase, name: name }
					: testcase
			);
			state.testcases = updatedTestcases;
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
	addNewTestCase,
	deleteParameter,
	setparameterName,
	setParameterType,
} = problemFormSlice.actions;
