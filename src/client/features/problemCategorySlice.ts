import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/client/api/client";
import { APIResponse, ProblemCategory } from "../lib/types";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
const cloudinary_url = import.meta.env.VITE_CLOUDINARY_URL;

export interface ProblemCategoryState {
	loading: boolean;
	name: string;
	title: string;
	tags: string[];
	categories: ProblemCategory[];
}

export const categoryInitialState: ProblemCategoryState = {
	loading: false,
	name: "",
	title: "",
	tags: [],
	categories: [],
};

// create new category
export const createCategory = createAsyncThunk<
	APIResponse<null>,
	{ formData: FormData }
>("category/createCategory", async ({ formData }, thunkAPI) => {
	try {
		// first upload the image to cloudinary then create category.
		const uploadRes = await fetch(cloudinary_url, {
			method: "POST",
			body: formData,
		});

		if (!uploadRes.ok) {
			toast.error("Image upload failed, please try again!");
			throw new Error(`Upload failed with status ${uploadRes.status}`);
		}

		toast.success("Image uploaded successfully");
		const uploadData = await uploadRes.json();
		const imgUrl = uploadData.secure_url;

		const store = thunkAPI.getState() as RootState;
		const { name, title, tags } = store.problem_category;

		// finally create category.
		const response = await api.post("/admin/create-category", {
			data: {
				name,
				title,
				imgUrl,
				tags,
			},
		});
		console.log("category response data: ", response.data);
		return response.data;
	} catch (error: any) {
		throw thunkAPI.rejectWithValue(
			error.message || "CREATE_CATEGORY_ERROR"
		);
	}
});

// fetch all categories.
export const fetchCategories = createAsyncThunk<APIResponse<ProblemCategory[]>>(
	"/fetchCategories/get-categories",
	async () => {
		try {
			const res = await api.get("/problem/get-categories");
			return  res.data;
		} catch (error: any) {
			console.log("FETCH_PROBLLEM_CATEGORY_ERROR: ", error);
		}
	}
);

export const problemCategorySlice = createSlice({
	name: "problem-category",
	initialState: categoryInitialState,
	reducers: {
		setCategoryName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setCategoryTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		addNewTag: (state, action: PayloadAction<string>) => {
			const updatedTags = [...state.tags];
			updatedTags.push(action.payload);
			state.tags = updatedTags;
		},
		removeTag: (state, action: PayloadAction<string>) => {
			const lable = action.payload;
			const updatedTags = state.tags.filter((tag) => tag !== lable);
			state.tags = updatedTags;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createCategory.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createCategory.fulfilled, (state, action) => {
			state.loading = false;
			const { success, msg } = action.payload;
			if (success) {
				toast.success(msg);
			}
			state.name = "";
			state.title = "";
			state.tags = [];
		});
		builder.addCase(createCategory.rejected, (state) => {
			state.loading = false;
			toast.error("Failed to create category!!");
		});
		builder.addCase(fetchCategories.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<APIResponse<ProblemCategory[]>>) => {
			state.loading = false;
			const { success, msg, data} = action.payload;
			if (success && data != null) {
				state.categories = data;
			}
			console.log(msg);
		});
		builder.addCase(fetchCategories.rejected, (state) => {
			state.loading = false;
		});
	},
});

export default problemCategorySlice.reducer;

export const { setCategoryName, setCategoryTitle, addNewTag, removeTag } =
	problemCategorySlice.actions;
