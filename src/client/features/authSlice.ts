import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/client";
import { RootState } from "../app/store";
import { UserApiResponse, RefreshTokenApiResponse } from "../types";

export interface User {
	isLogin: boolean;
	isSignup: boolean;
	username: string;
	email: string;
	password: string;

}
export const initialState: User = {
	isLogin: false,
	isSignup: false,
	username: "",
	email: "",
	password: "",

};

export const signup = createAsyncThunk("/user/signup", async (_, ThunkAPI) => {
	try {
		const store = ThunkAPI.getState() as RootState;
		const { username, email, password } = store.user;

		const res = await api.post("/user/signup",
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
		console.error(
			"Error occured during signup : ",
			(error as Error).message
		);
	}
});

export const login = createAsyncThunk<UserApiResponse>("/user/login", async (_, ThunkAPI) => {
	try {
		const store = ThunkAPI.getState() as RootState;
		const { email, password } = store.user;

		const res = await api.post("/user/login",
			{
				data: {
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

		console.log("user Login response: ", res);
		return res.data;
	} catch (error: any) {
		console.error(
			"Error occured during signup : ",
			(error as Error).message
		);
	}
});


export const refreshToken = createAsyncThunk<RefreshTokenApiResponse>(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('/user/refresh-token', {
			withCredentials: true
		});
        return response.data;
		
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Refresh failed');
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
		rehydrateAuth: (state) => {
			const token = localStorage.getItem("CToken");
			// const token = state.accessToken;
			if (token) {
				state.isLogin = true;
			}
		},
		// setCredentials: (state, action: PayloadAction<{accessToken: string}>) => {
        //     const { accessToken } = action.payload;
        //     // state.accessToken = accessToken;
        // },
        setLogout: () => {
            localStorage.removeItem("CToken");
        }
	},
	extraReducers: (builder) => {
		builder.addCase(signup.pending, (state, _) => {
			state.isLogin = false;
			state.isSignup = false;
		});
		builder.addCase(signup.fulfilled, (state, action: PayloadAction<{ success: boolean; msg: any }>) => {
				const { success, msg } = action.payload;
				if (success) {
					state.isSignup = true;
				}
				console.log("Message: ", msg);
				state.isLogin = false;
			}
		);
		builder.addCase(signup.rejected, (state, _) => {
			state.isLogin = false;
			state.isSignup = false;
		});
		builder.addCase(login.pending, (state, _) => {
			state.isLogin = false;
			state.isSignup = false;
		});
		builder.addCase(login.fulfilled,(state, action)	=> {
				const { success, message } = action.payload;
				const token = action.payload.token
				if (success && token) {
					state.isLogin = true;
					localStorage.setItem("CToken", token);
					// state.accessToken = token;
				}
				console.log("Login response msg : ", message);
				state.isSignup = false;
			}
		);
		builder.addCase(login.rejected, (state, _) => {
			state.isSignup = false;
		});
		builder.addCase(refreshToken.fulfilled, (_, action) => {
			const { success, message } = action.payload;
			if (success){
				const accessToken = action.payload.accessToken;
				localStorage.setItem("CToken", accessToken!);
			}
			console.log('Refresh token message: ', message);

		});
	},
});

export default userSlice.reducer;
export const { setUsername, setEmail, setPassword, rehydrateAuth, setLogout } =
	userSlice.actions;
