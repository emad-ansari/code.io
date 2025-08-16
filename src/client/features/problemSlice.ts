import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
	FetchProblemProps,
	APIResponse,
	ProblemDetail,
	UserSubmission,
	ProblemState,
	Testcase,
	Template,
	Problem,
} from "@/client/lib/types";
import { api } from "@/client/api/client";
import { RootState } from "@/client/app/store";
import { toast } from "react-toastify";


export const problemInitialState: ProblemState = {
	loading: false,
	category: "",
	title: "",
	difficulty: "",
	description: "",
	tags: [],
	likes: 0,
	dislikes: 0,
	testcases: [],
	templates: [],
	totalPages: 0,
	pageSize: 10,
	problems: [],
	problemDetail: null,
	userSubmissions: []
};

export const createProblem = createAsyncThunk(
	"/problem/createProblem",
	async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const {
				category,
				title,
				description,
				difficulty,
				tags,
				testcases,
				templates,
			} = store.problem;

			const res = await api.post("/problem/create-problem", {
				data: {
					problemCategory: category,
					problemTitle: title,
					description,
					difficulty,
					tags,
					testcases,
					templates,
				},
			});

			console.log("new problme contribution response: ", res.data);
			return res.data;
		} catch (error: any) {
			console.error("Error: ", (error as Error).message);
		}
	}
);

export const fetchProblems = createAsyncThunk(
	"/problem/fetchProblems",
	async (
		{
			categoryName,
			pageNumber,
			difficulty,
			status,
			searchKeywords,
		}: FetchProblemProps,
		ThunkAPI
	) => {
		const store = ThunkAPI.getState() as RootState;
		const { pageSize } = store.problem;
		try {
			const res = await api.get<
				APIResponse<{ problems: Problem[]; totalPages: number }>
			>(`/problem/get-problems`, {
				params: {
					category: categoryName,
					page: pageNumber < 1 ? 1 : pageNumber,
					pageSize,
					difficulty,
					status,
					searchKeywords,
				},
			});
			const data = res.data;
			console.log('problem response data: ', data);

			return data;
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(
				error.message || "failed to fetch problems"
			);
		}
	}
);

export const fetchProblemDetail = createAsyncThunk<
	APIResponse<ProblemDetail>,
	{ problemId: string }
>("/problem/fetchProblemDetail", async ({ problemId }: { problemId: string }) => {
	if (!problemId) {
		return;
	}
	try {
		const res = await api.get(`/problem/get-problem-details/${problemId}`);
		const data = res.data;
		console.log('problem detail response: ', data);
		return data;
	} catch (error: any) {
		console.log(error);
	}
});

export const fetchUserSubmissions = createAsyncThunk(
	"/problem/fetchUserSubmissions",
	async (_, thunkAPI) => {
		try {
			const response = await api.get<APIResponse<UserSubmission[]>>(
				"/submission/get-submissions"
			);
			const data = response.data;
			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(
				error.message || "Error occurred while fetching default code."
			);
		}
	}
);


export const updateLikes = createAsyncThunk("problem/updateLikes", async({ problemId}: {problemId: string}, thunkAPI) => {
	try {
		const res = await api.post('/problem/update-likes', {
			data: problemId
		})
		return res.data;
	}
	catch(error: any) {
		thunkAPI.rejectWithValue(error.message || "UPDATE_LIKES_ERROR");
	}
})

export const problemSlice = createSlice({
	name: "problem",
	initialState: problemInitialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload;
		},
		setDifficulty: (state, action: PayloadAction<string>) => {
			state.difficulty = action.payload;
		},
		addNewTag: (state, action: PayloadAction<string>) => {
			const updatedTags = [...state.tags];
			updatedTags.push(action.payload);
			state.tags = updatedTags;
		},
		addNewTestcase: (state) => {
			const newTestcase: Testcase = {
				id: uuidv4(),
				input: "",
				expected_output: "",
				isSample: false,
			};
			const updatedTestcase = [...state.testcases];
			updatedTestcase.push(newTestcase);
			state.testcases = updatedTestcase;
		},
		setInput: (
			state,
			action: PayloadAction<{ id: string; input: string }>
		) => {
			const { id, input } = action.payload;
			const updatedTestcase = state.testcases.map((testcase) =>
				testcase.id === id ? { ...testcase, input: input } : testcase
			);
			state.testcases = updatedTestcase;
		},
		setOutput: (
			state,
			action: PayloadAction<{ id: string; output: string }>
		) => {
			const { id, output } = action.payload;
			const updatedTestcase = state.testcases.map((testcase) =>
				testcase.id === id
					? { ...testcase, expected_output: output }
					: testcase
			);
			state.testcases = updatedTestcase;
		},
		setIsSample: (
			state,
			action: PayloadAction<{ id: string; isSample: boolean }>
		) => {
			const { id, isSample } = action.payload;
			const updatedTestcase = state.testcases.map((t) =>
				t.id == id ? { ...t, isSample: isSample } : t
			);
			state.testcases = updatedTestcase;
		},
		deleteTestcase: (state, action: PayloadAction<string>) => {
			const testcaseId = action.payload;
			const updatedTestcase = state.testcases.filter(
				(testcase) => testcase.id !== testcaseId
			);
			state.testcases = updatedTestcase;
		},
		removeTag: (state, action: PayloadAction<{ tagName: string }>) => {
			const { tagName } = action.payload;
			const updatedTags = state.tags.filter((tag) => tag !== tagName);
			state.tags = updatedTags;
		},
		addNewTemplate: (state) => {
			const newTemplate: Template = {
				id: uuidv4(),
				language: "",
				full_template: "",
				boiler_code: "",
			};
			const updatedTemplate = [...state.templates];
			updatedTemplate.push(newTemplate);
			state.templates = updatedTemplate;
		},
		deleteTemplate: (state, action: PayloadAction<string>) => {
			const templateId = action.payload;
			const updatedTemplate = state.templates.filter(
				(template) => template.id !== templateId
			);
			state.templates = updatedTemplate;
		},
		setLanguage: (
			state,
			action: PayloadAction<{ id: string; language: string }>
		) => {
			const { id, language } = action.payload;
			const updatedTemplate = state.templates.map((template) =>
				template.id == id
					? { ...template, language: language }
					: template
			);
			state.templates = updatedTemplate;
		},
		setTemplateCode: (
			state,
			action: PayloadAction<{ id: string; t_code: string }>
		) => {
			const { id, t_code } = action.payload;
			const updatedTemplate = state.templates.map((template) =>
				template.id == id
					? { ...template, template_code: t_code }
					: template
			);
			state.templates = updatedTemplate;
		},
		setBoilerFucntion: (
			state,
			action: PayloadAction<{ id: string; b_function: string }>
		) => {
			const { id, b_function } = action.payload;
			const updatedTemplate = state.templates.map((template) =>
				template.id == id
					? { ...template, boiler_function: b_function }
					: template
			);
			state.templates = updatedTemplate;
		},
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
		},
		setProblems: (
			state,
			action: PayloadAction<{ problems: Problem[] }>
		) => {
			const { problems } = action.payload;
			state.problems = problems;
		},

	},
	extraReducers: (builder) => {
		builder.addCase(createProblem.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createProblem.fulfilled, (state, action) => {
			state.loading = false;
			const { success } = action.payload;
			if (success) {
				toast.success("Problem Created Successfully")
			}
		});
		builder.addCase(createProblem.rejected, (state) => {
			state.loading = false;
			toast.error("Failed to create problem")
		});
		builder.addCase(fetchProblems.pending, (_, action) => {
			console.log(action.payload);
		});
		builder.addCase(fetchProblems.fulfilled, (state, action) => {
			const { success, data } = action.payload;
			if (success && data) {
				const { problems, totalPages } = data;
				state.problems = problems;
				state.totalPages = totalPages;
			}
		});
		builder.addCase(fetchProblems.rejected, (state, action) => {
			console.log(action.payload);
			state.loading = false
		});
		builder.addCase(fetchProblemDetail.pending, (state, _) => {
			state.loading = true;
		});
		builder.addCase(fetchProblemDetail.fulfilled, (state, action) => {
			state.loading = false;
			const { success, data } = action.payload;
			if (success && data) {
				state.problemDetail = data;
			}
		});
		builder.addCase(fetchProblemDetail.rejected, (state, action) => {
			state.loading = false;
			console.log('FETCHED_PROBLEM_DETAILS_REDCUCER:', action.payload);
		});
		builder.addCase(updateLikes.pending, (state) => {
			state.loading = true;
			
		});
		builder.addCase(updateLikes.fulfilled, (state, action) => {
			state.loading = false;
			console.log(action.payload);
		});
		builder.addCase(updateLikes.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
		});
		builder.addCase(fetchUserSubmissions.pending, (state, action) => {
			state.loading = true;
			console.log(action.payload);
		});
		
		builder.addCase(fetchUserSubmissions.fulfilled, (state, action) => {
			state.loading  = false;
			const { success, data } = action.payload;
			if (success && data !== undefined) {
				state.userSubmissions = data;
			}
			console.log("user submissions api response: ", data);
		});
		builder.addCase(fetchUserSubmissions.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
		});
	},
});

export default problemSlice.reducer;
export const {
	setCategory,
	setTitle,
	setDescription,
	setDifficulty,
	addNewTag,
	addNewTestcase,
	setInput,
	setOutput,
	setIsSample,
	deleteTestcase,
	deleteTemplate,
	removeTag,
	addNewTemplate,
	setLanguage,
	setTemplateCode,
	setBoilerFucntion,
	setPageSize,
	setProblems,
} = problemSlice.actions;
