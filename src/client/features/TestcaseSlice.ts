import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { RootState } from "../app/store";

export interface TestCaseInputType {
	inputId: string;
	name: string;
	type: string;
	value: string;
}

export interface TestCase {
	testcaseId: string;
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
			testcaseId: "1",
			inputs: [{ inputId: "1", name: "", type: "", value: "" }],
			output: {
				type: "",
				value: "",
			},
		},
		{
			testcaseId: "2",
			inputs: [{ inputId: "2", name: "", type: "", value: "" }],
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
				if (testcase.testcaseId === testcaseId) {
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
		
		removeTestCase: (state, action: PayloadAction<string>) => {
            const testcaseId = action.payload;
            const filteredTestcases = state.testcases.filter(testcase => testcase.testcaseId !== testcaseId);
            state.testcases = filteredTestcases;
        },
        removeTestCaseInput: (state, action: PayloadAction<{testcaseId: string, inputId: string}>) => {
            const {testcaseId, inputId} = action.payload;
            const testcases = [...state.testcases];
            const updatedTestcases = testcases.map(testcase => {
                if (testcase.testcaseId === testcaseId){    
                    const inputs = [...testcase.inputs];
                    const updatedTestcaseInput = inputs.filter(input => input.inputId !== inputId );
                    return {...testcase, inputs: updatedTestcaseInput};
                }
                else {
                    return testcase
                }
            });
            state.testcases = updatedTestcases;
        },
        setTestCaseInputValue: (state, action: PayloadAction<{testcaseId: string, inputId: string, value: string}>) => {
            const { testcaseId, inputId, value} = action.payload;
            const testcases = [...state.testcases];
            const updatedTestCases = testcases.map(testcase => {
                if (testcase.testcaseId === testcaseId){
                    const updateTestcaesInput = testcase.inputs.map(input => {
                        if (input.inputId === inputId){
                            return {...input, value: value};
                        }
                        else {
                            return input;
                        }
                    })
                    return { ...testcase, inputs: updateTestcaesInput};
                }
                else {
                    return testcase;
                }
            });
            state.testcases = updatedTestCases;
        },
        setTestCaseInputType: (state, action: PayloadAction<{testcaseId: string, inputId: string, type: string}>) => {
            const { testcaseId, inputId, type} = action.payload;
            const testcases = [...state.testcases];
            const updatedTestCases = testcases.map(testcase => {
                if (testcase.testcaseId === testcaseId){
                    const updateTestcaesInput = testcase.inputs.map(input => {
                        if (input.inputId === inputId){
                            return {...input, type: type};
                        }
                        else {
                            return input;
                        }
                    })
                    return { ...testcase, inputs: updateTestcaesInput};
                }
                else {
                    return testcase;
                }
            });
            state.testcases = updatedTestCases;
        },
        setTestCaseInputName: (state, action: PayloadAction<{testcaseId: string, inputId: string, name: string}>) => {
            const { testcaseId, inputId, name} = action.payload;
            const testcases = [...state.testcases];
            const updatedTestCases = testcases.map(testcase => {
                if (testcase.testcaseId === testcaseId){
                    const updateTestcaesInput = testcase.inputs.map(input => {
                        if (input.inputId === inputId){
                            return {...input, name: name};
                        }
                        else {
                            return input;
                        }
                    })
                    return { ...testcase, inputs: updateTestcaesInput};
                }
                else {
                    return testcase;
                }
            });
            state.testcases = updatedTestCases;
		},
        setTestCaseOutputValue: (state, action: PayloadAction<{testcaseId: string,  outputValue: string}>) => {
            const { testcaseId, outputValue } = action.payload;
            const testcases = [...state.testcases];
            const updateTestCases = testcases.map(testcase => {
                if (testcase.testcaseId === testcaseId){
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
                if (testcase.testcaseId === testcaseId){
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
    setTestCaseInputType,
    setTestCaseInputName,
    setTestCaseOutputValue,
    setTestCaseOutputType,
} = testCaseSlice.actions;
