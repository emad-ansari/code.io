import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/api/client";
import { APIResponse, AuthResponse, UserDetail } from "@/lib/types";

export interface AuthState {
	loading: boolean;
	isLoggedIn: boolean;
	isAuthChecked: boolean;
	user: UserDetail | null;
	error?: string | null;
}
export const initialState: AuthState = {
	loading: false,
	isLoggedIn:  false,
	isAuthChecked: false,
	user: null,
	error: null,
};

interface FormData {
	username?: string;
	email: string;
	password: string;
}

export const signup = createAsyncThunk<AuthResponse, FormData>(
	"/auth/signup",
	async ({ username, email, password }: FormData, ThunkAPI) => {
		try {
			const res = await api.post("/auth/signup", {
				data: {
					username,
					email,
					password,
				},
			});
			return res.data;
		} catch (error: any) {
			const message =
				error?.response?.data?.msg ||
				error.message ||
				"Error while Sign up";
			return ThunkAPI.rejectWithValue(message);
		}
	},
);

export const login = createAsyncThunk<
	AuthResponse,
	FormData,
	{ rejectValue: string }
>("/auth/login", async ({ email, password }: FormData, ThunkAPI) => {
	try {
		const res = await api.post(
			"/auth/login",
			{
				data: {
					email,
					password,
				},
			},
			{
				withCredentials: true,
			},
		);
		return res.data;
	} catch (error: any) {
		const message =
			error?.response?.data?.msg ||
			error.message ||
			"Error occurred while login";
		return ThunkAPI.rejectWithValue(message);
	}
});

export const getUserDetails = createAsyncThunk<APIResponse<UserDetail>>(
	"/user/getUserDetails",
	async (_, ThunkAPI) => {
		try {
			const res = await api.get("/user/detail");
			return res.data;
		} catch (error: any) {
			ThunkAPI.rejectWithValue(
				error.message || "Error occurred while fetching user details",
			);
		}
	},
);

export const logOut = createAsyncThunk<APIResponse<null>>(
	"/user/logOut",
	async (_, ThunkAPI) => {
		try {
			const res = await api.post(
				"/auth/logout",
				{},
				{ withCredentials: true },
			);
			console.log("user logout response: ", res);
			return res.data;
		} catch (error: any) {
			ThunkAPI.rejectWithValue(
				error.message || "Error while  signing up",
			);
		}
	},
);

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLoading: (state, _) => {
			state.loading = true;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		rehydrateAuth: (state) => {
			const token = localStorage.getItem("CToken");
			if (token) {
				state.isLoggedIn = true;
				state.isAuthChecked = true;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			signup.fulfilled,
			(state, action: PayloadAction<AuthResponse>) => {
				state.loading = false;
				const { success, msg, data } = action.payload;
				if (success && data && data.token) {
					state.isLoggedIn = true;
					state.user = data.user;
					localStorage.setItem("CToken", data.token);
					toast.success("User Registered Successfully");
				} else {
					state.error = msg;
					toast.error("Something went wrong, please try again");
				}
			},
		);
		builder.addCase(signup.rejected, (state) => {
			state.loading = false;
			toast.error("Failed to sign up");
		});
		builder.addCase(login.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<AuthResponse>) => {
				state.loading = false;
				const { success, data, msg } = action.payload;
				if (success && data && data.token) {
					state.isLoggedIn = true;
					state.user = data.user;
					localStorage.setItem("CToken", data.token);
					toast.success(`${msg}`);
				} else {
					state.error = msg;
				}
			},
		);
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload as string) || "Invalid email or password";
			toast.error(state.error);
		});
		builder.addCase(logOut.fulfilled, (state, action) => {
			const { success } = action.payload;
			if (success) {
				state.isLoggedIn = false;
				localStorage.removeItem("CToken");
				toast.success("Logout successfully");
				window.location.href = "/";
			}
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

export default authSlice.reducer;
export const { setError, setIsLoading, rehydrateAuth } = authSlice.actions;
