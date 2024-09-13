import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { RootState } from "../app/store";

export interface TestCaseInputType {
	id: string;
	name: string;
	type: string;
	value: string;
}

export interface TestCase {
	id: string;
	inputs: TestCaseInputType[];
	output: TestCaseOutput;
}
export interface TestCaseOutput{
    type: string;
    value: string;
}
export interface TestCaseState {
	problemTitle: string;
	testcases: TestCase[];
}
export const TestCaseFormInitailState: TestCaseState = {
	problemTitle: "",
	testcases: [
		{
			id: "1",
			inputs: [{ id: "1", name: "", type: "", value: "" }],
			output: {
				type: "",
				value: "",
			},
		},
		{
			id: "2",
			inputs: [{ id: "2", name: "", type: "", value: "" }],
			output: {
				type: "",
				value: "",
			},
		},
	],
};

// export const createTestCase = createAsyncThunk('/testcase/createTestCase', async(_, ThunkAPI) => {
//     try{
//         const store = ThunkAPI.getState() as RootState;
//         const { problemTitle, input, output} = store.TestCaseForm;

//         const res = await  client.post('/testcase/create-test-case', {
//             problemTitle,
//             input,
//             output
//             // also need to send jwt token
//         });
//         return res.data;
//     }
//     catch(error: any){
//         console.error("Error: ", (error as Error).message);
//     }
// })

export const testCaseSlice = createSlice({
	name: "problemForm",
	initialState: TestCaseFormInitailState,
	reducers: {
		setProblemTitle: (state, action: PayloadAction<string>) => {
			state.problemTitle = action.payload;
		},

		addNewTestCase: (state, action: PayloadAction<TestCase>) => {
			let updateTestCase = [...state.testcases];
			updateTestCase.push(action.payload);
			state.testcases = updateTestCase;
		},
		addTestCaseInput: (
			state,
			action: PayloadAction<{
				testcaseId: string;
				newInput: TestCaseInputType;
			}>
		) => {
			const { testcaseId, newInput } = action.payload;
			let testcases = [...state.testcases];
			const updatedTestCases = testcases.map((testcase) => {
				if (testcase.id === testcaseId) {
					const upatedTestCaseInput = [...testcase.inputs];
					upatedTestCaseInput.push(newInput);
					return { ...testcase, inputs: upatedTestCaseInput };
				} else {
					return testcase;
				}
			});
			console.log("Updated testcase array: ", state.testcases);
			state.testcases = updatedTestCases;
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

		removeTestCase: (state, action: PayloadAction<string>) => {
            const testcaseId = action.payload;
            const filteredTestcases = state.testcases.filter(testcase => testcase.id !== testcaseId);
            state.testcases = filteredTestcases;
        },
        removeTestCaseInput: (state, action: PayloadAction<{testcaseId: string, inputId: string}>) => {
            const {testcaseId, inputId} = action.payload;
            const testcases = [...state.testcases];
            const updatedTestcases = testcases.map(testcase => {
                if (testcase.id === testcaseId){    
                    const inputs = [...testcase.inputs];
                    const updatedTestcaseInput = inputs.filter(input => input.id !== inputId );
                    return {...testcase, inputs: updatedTestcaseInput};
                }
                else {
                    return testcase
                }
            });
            state.testcases = updatedTestcases;
        },
        setTestCaseInputValue: (state, action) => {
            
        },
        setTestCaseOutputValue: (state, action: PayloadAction<{testcaseId: string,  outputValue: string}>) => {
            const { testcaseId, outputValue } = action.payload;
            const testcases = [...state.testcases];
            const updateTestCases = testcases.map(testcase => {
                if (testcase.id === testcaseId){
                    return {...testcase, output: {...testcase.output, value: outputValue}};
                }
                else {
                    return testcase;
                }
            })
            state.testcases = updateTestCases;
        },
        setTestCaseOutputType: (state, action: PayloadAction<{testcaseId: string,  outputType: string}>) => {
            const { testcaseId, outputType } = action.payload;
            const testcases = [...state.testcases];
            const updateTestCases = testcases.map(testcase => {
                if (testcase.id === testcaseId){
                    return {...testcase, output: {...testcase.output, type: outputType}};
                }
                else {
                    return testcase;
                }
            })
            state.testcases = updateTestCases;
        },

	},
	// extraReducers: (builder) => {
	//     builder.addCase(createTestCase.pending, (_, action) => {
	//         console.log('status is pending', action.payload);

	//     }),
	//     builder.addCase(createTestCase.fulfilled, (_, action) => {
	//         console.log('status is fulfilled', action.payload);
	//     }),
	//     builder.addCase(createTestCase.rejected, (_, action) => {
	//         console.log('status is rejected', action.payload);

	//     })
	// }
});

export default testCaseSlice.reducer;
export const {
	setProblemTitle,
	addNewTestCase,
	addTestCaseInput,
	removeTestCase,
    removeTestCaseInput,
    setTestCaseInputValue,
    setTestCaseOutputValue,
    setTestCaseOutputType
} = testCaseSlice.actions;
