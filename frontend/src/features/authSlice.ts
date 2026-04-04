import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/api/client";
import { APIResponse, AuthResponse, UserDetail } from "@/lib/types";

export interface AuthState {
	loading: boolean;
	isLoggedIn: boolean;
	user: UserDetail | null;
	error?: string | null;
}
export const initialState: AuthState = {
	loading: false,
	isLoggedIn: false,
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
				"Error while signing up";
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
			return res.data;
		} catch (error: any) {
			return ThunkAPI.rejectWithValue(
				error.message || "Error while logging out",
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
				if (action.payload) {
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
				} else {
					state.error = "Unexpected response from server";
					toast.error(state.error);
				}
			},
		);
		builder.addCase(signup.rejected, (state, action) => {
			state.loading = false;
			state.error = (action.payload as string) || "Failed to sign up";
			toast.error(state.error);
		});
		builder.addCase(login.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<AuthResponse>) => {
				state.loading = false;
				if (action.payload) {
					const { success, data, msg } = action.payload;
					if (success && data && data.token) {
						state.isLoggedIn = true;
						state.user = data.user;
						localStorage.setItem("CToken", data.token);
						toast.success(`${msg}`);
					} else {
						state.error = msg;
					}
				} else {
					state.error = "Unexpected response from server";
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
			if (action.payload) {
				const { success } = action.payload;
				if (success) {
					state.isLoggedIn = false;
					localStorage.removeItem("CToken");
					toast.success("Logout successfully");
					window.location.href = "/";
				}
			} else {
				state.error = "Unexpected response from server";
				toast.error(state.error);
			}
		});
		builder.addCase(logOut.rejected, (state, action) => {
			state.error = (action.payload as string) || "Failed to log out";
			toast.error(state.error);
		});
		builder.addCase(getUserDetails.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserDetails.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload) {
				const { success, data } = action.payload;
				if (success && data) {
					state.user = data;
				}
			}
		});
		builder.addCase(getUserDetails.rejected, (state, action) => {
			state.loading = false;
			state.error =
				(action.payload as string) || "Failed to fetch user details";
		});
	},
});

export default authSlice.reducer;
export const { setError, setIsLoading, rehydrateAuth } = authSlice.actions;
