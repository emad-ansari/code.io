import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { api } from "@/client/api/client";
import { RootState } from "@/client/app/store";
import { APIResponse } from "@/client/lib/types";

export interface User {
	isLoading: boolean,
	isLogin: boolean;
	isSignup: boolean;
	username: string;
	email: string;
	password: string;
}
export const initialState: User = {
	isLoading: false,
	isLogin: false,
	isSignup: false,
	username: "",
	email: "",
	password: "",
};

export const signup = createAsyncThunk("/auth/signup", async (_, ThunkAPI) => {
	try {
		const store = ThunkAPI.getState() as RootState;
		const { username, email, password} = store.user;
		
		const res = await api.post("/auth/signup",
			{
				data: {
					username,
					email,
					password,
				},
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return res.data;
	} catch (error: any) {
		ThunkAPI.rejectWithValue(error.message || "Error while Sign up");
	}
});

export const login = createAsyncThunk<APIResponse<{ token: string }>>(
	"/auth/login",
	async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { email, password } = store.user;

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
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return res.data;
		} catch (error: any) {
			ThunkAPI.rejectWithValue(error.message || "Error occurred while login");
		}
	}
);

export const logOut = createAsyncThunk<APIResponse<null>>(
	"/user/logOut",
	async (_,ThunkAPI ) => {
		try {
			const res = await api.post(
				"/user/logout",
				{},
				{ withCredentials: true }
			);
			console.log("user logout response: ", res);
			return res.data;
		} catch (error: any) {
			ThunkAPI.rejectWithValue(error.message || "Error while  signing up");
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
			state.isLoading = true;
		},
		rehydrateAuth: (state) => {
			const token = localStorage.getItem("CToken");
			if (token) {
				state.isLogin = true;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signup.pending, (state, _) => {
			state.isLogin = false;
			state.isSignup = false;
			state.isLoading = true;
		});
		builder.addCase(
			signup.fulfilled,
			(state, action) => {
				const { success } = action.payload;
				if (success) {
					state.isSignup = true;
					toast.success("User Registered Successfully")
				}
				else {
					toast.error("Something went wrong, please try again");
				}
				state.isLoading = false
				state.isLogin = false;
			}
		);
		builder.addCase(signup.rejected, (state, _) => {
			state.isLogin = false;
			state.isSignup = false;
			state.isLoading = false;
		});
		builder.addCase(login.pending, (state, _) => {
			state.isLogin = false;
			state.isSignup = false;
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			const { success,  data, msg } = action.payload;
			if (success && data) {
				state.isLogin = true;
				localStorage.setItem("CToken", data.token);
				toast.success("Login successfully")
			}
			state.isSignup = false;
			state.isLoading = false;
			console.log("Message: ", msg);
		});
		builder.addCase(login.rejected, (state, _) => {
			state.isSignup = false;
			state.isLoading = false;
		});
		builder.addCase(logOut.fulfilled, (state, action) => {
			const { success, msg } = action.payload;
			if (success) {
				state.isLogin = false;
				localStorage.removeItem("CToken");
				toast.success("Logout successfully", {
					position: "top-center",
				})
			}
			state.isSignup = false;
			console.log("Logout message: ", msg);
		});
	},
});

export default userSlice.reducer;
export const { setUsername, setEmail, setPassword, setIsLoading, rehydrateAuth } =
	userSlice.actions;
