import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/api/client";
import { RootState } from "@/app/store";
import { APIResponse, UserDetail } from "@/lib/types";



export interface User {
	loading: boolean;
	isLogin: boolean;
	isSignup: boolean;
	username: string;
	email: string;
	password: string;
	user: UserDetail | null;
}
export const initialState: User = {
	loading: false,
	isLogin: false,
	isSignup: false,
	username: "",
	email: "",
	password: "",
	user: null
};

export const signup = createAsyncThunk("/auth/signup", async (_, ThunkAPI) => {
	try {
		const store = ThunkAPI.getState() as RootState;
		const { username, email, password } = store.user;

		const res = await api.post("/auth/signup", {
			data: {
				username,
				email,
				password,
			},
		});
		return res.data;
	} catch (error: any) {
		ThunkAPI.rejectWithValue(error.message || "Error while Sign up");
	}
});

export const login = createAsyncThunk<APIResponse<UserDetail>>("/auth/login", async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { email, password } = store.user;

			const
			 res = await api.post(
				"/auth/login",
				{
					data: {
						email,
						password,
					},
				},
				{
					withCredentials: true,
				}
			);
			return res.data;
		} catch (error: any) {
			ThunkAPI.rejectWithValue(
				error.message || "Error occurred while login"
			);
		}
	}
);

export const getUserDetails = createAsyncThunk<APIResponse<UserDetail>> ("/user/getUserDetails", async (_, ThunkAPI) => {
	try {
		const res = await api.get("/user/get-user-details");
		return res.data;
	} catch (error: any) {
		ThunkAPI.rejectWithValue(
			error.message || "Error occurred while fetching user details"
		);
	}
});	



export const logOut = createAsyncThunk<APIResponse<null>>(
	"/user/logOut",
	async (_, ThunkAPI) => {
		try {
			const res = await api.post(
				"/auth/logout",
				{},
				{ withCredentials: true }
			);
			console.log("user logout response: ", res);
			return res.data;
		} catch (error: any) {
			ThunkAPI.rejectWithValue(
				error.message || "Error while  signing up"
			);
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setIsLoading: (state, _) => {
			state.loading = true;
		},
		rehydrateAuth: (state) => {
			const token = localStorage.getItem("CToken");
			if (token) {
				state.isLogin = true;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			state.loading = false;
			const { success } = action.payload;
			if (success) {
				state.isSignup = true;
				toast.success("User Registered Successfully");
			} else {
				toast.error("Something went wrong, please try again");
			}
		});
		builder.addCase(signup.rejected, (state, _) => {
			state.loading = false;
		});
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action: PayloadAction<APIResponse<UserDetail>>) => {
			state.loading = false;
			const { success, data, msg } = action.payload;
			if (success && data && data.token) {
				state.isLogin = true;
				state.user = data
				localStorage.setItem("CToken", data.token);
				toast.success(`${msg}`);
			}
		});
		builder.addCase(login.rejected, (state, _) => {
			state.isSignup = false;
			state.loading = false;
		});
		builder.addCase(logOut.fulfilled, (state, action) => {
			const { success } = action.payload;
			if (success) {
				state.isLogin = false;
				localStorage.removeItem("CToken");
				toast.success("Logout successfully");
			}
			state.isSignup = false;
		});
		builder.addCase(getUserDetails.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserDetails.fulfilled, (state, action) => {
			state.loading = false;
			const { success, data } = action.payload;
			if (success && data) {
				state.user = data;
			}
		});
		builder.addCase(getUserDetails.rejected, (state, _) => {
			state.loading = false;
		});
	},
});

export default userSlice.reducer;
export const {
	setUsername,
	setEmail,
	setPassword,
	setIsLoading,
	rehydrateAuth,
} = userSlice.actions;
