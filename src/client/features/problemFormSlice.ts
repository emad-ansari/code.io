import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { api } from "../api/client";
import { RootState } from "../app/store";

export interface Testcase {
	id: string;
	input: string;
	expected_output: string;
	explanation?: string;
	isSample: boolean;
}

export interface Template {
	id: string;
	language: string;
	template_code: string;
	boiler_function: string;
}
export interface Problem {
	category: string;
	title: string;
	difficulty: string;
	description: string;
	tags: string[];
	testcases: Testcase[];
	templates: Template[];
}

export const ProblemFormInitailState: Problem = {
	category: "",
	title: "",
	difficulty: "",
	description: "",
	tags: [],
	testcases: [],
	templates: [],
};

export const createProblem = createAsyncThunk(
	"/problem/createProblem",
	async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { title, description, difficulty, testcases } =
				store.problemform;

			if (title === "") {
				alert("please fill the title");
				return;
			}

			const res = await api.post(
				"/problem/create-problem",
				{
					title,
					description,
					difficulty,
					testcases,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("CToken"),
					},
				}
			);

			console.log("new problme contribution response: ", res.data);
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
				explanation: "",
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
		removeTag: (state, action: PayloadAction<{tagName: string}>) => {	
			const {tagName } = action.payload;
			const updatedTags = state.tags.filter(tag => tag !== tagName);
			state.tags = updatedTags;
		},
		addNewTemplate: (state) => {
			const newTemplate: Template = {
				id: uuidv4(),
				language: "java",
				template_code: "",
				boiler_function: "",
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
		setTemplateCode: (state, action: PayloadAction<{id: string, t_code: string}>) => {
			const { id, t_code}= action.payload;
			const updatedTemplate = state.templates.map((template) =>
				template.id == id
					? { ...template, template_code: t_code }
					: template
			);
			state.templates = updatedTemplate;
		},
		setBoilerFucntion: (state, action: PayloadAction<{id: string, b_function: string}>) => {
			const { id, b_function}= action.payload;
			const updatedTemplate = state.templates.map((template) =>
				template.id == id
					? { ...template, boiler_function: b_function }
					: template
			);
			state.templates = updatedTemplate;
		}
	},
});

export default problemFormSlice.reducer;
export const {
	setCategory,
	setTitle,
	setDescription,
	setDifficulty,
	addNewTag,
	addNewTestcase,
	removeTag,
	setInput,
	setOutput,
	setIsSample,
	deleteTestcase,
	addNewTemplate,
	deleteTemplate,
	setLanguage,
	setTemplateCode,
	setBoilerFucntion
} = problemFormSlice.actions;
