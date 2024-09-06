import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { RootState } from "../app/store";

export interface TestCaseState {
	problemTitle: string;
	input: string;
    output: string
}
export const TestCaseFormInitailState: TestCaseState = {
	problemTitle: "",
	input: "",
    output: "",
};

export const createTestCase = createAsyncThunk('/testcase/createTestCase', async(_, ThunkAPI) => {
    try{    
        const store = ThunkAPI.getState() as RootState;
        const { problemTitle, input, output} = store.TestCaseForm;

        const res = await  client.post('/testcase/create-test-case', {
            problemTitle,
            input,
            output
            // also need to send jwt token
        });
        return res.data;
    }
    catch(error: any){
        console.error("Error: ", (error as Error).message);
    }
})


export const problemFormSlice = createSlice({
	name: "problemForm",
	initialState: TestCaseFormInitailState,     
	reducers: {
		setProblemTitle: (state, action: PayloadAction<string>) => {
            state.problemTitle = action.payload;
        },
		setTestCaseInput: (state, action: PayloadAction<string>) => {
            state.input = action.payload;
        },
		setTestCaseOutput: (state, action: PayloadAction<string>) => {
            state.output = action.payload;
        },
	},
    extraReducers: (builder) => {
        builder.addCase(createTestCase.pending, (_, action) => {
            console.log('status is pending', action.payload);

        }),
        builder.addCase(createTestCase.fulfilled, (_, action) => {
            console.log('status is fulfilled', action.payload);
        }),
        builder.addCase(createTestCase.rejected, (_, action) => {
            console.log('status is rejected', action.payload);

        })
    }
});

export default problemFormSlice.reducer;
export const {
	setProblemTitle,
    setTestCaseInput,
	setTestCaseOutput
} = problemFormSlice.actions;
