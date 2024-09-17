import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { RootState } from "../app/store";


export interface User {
    isLogin: boolean;
    isSignup: boolean;
    username: string;
    email: string;
    password: string
}
export const initialState: User = {
    isLogin: false,
    isSignup: false,
    username: "",
    email: "",
    password: ""
}


export const signup = createAsyncThunk("/user/signup", async (_, ThunkAPI) => {
		try {
			const store = ThunkAPI.getState() as RootState;
			const { username, email, password} = store.user;

			const res = await client.post("/user/signup", {
                data: {
                    username,
                    email,
                    password
                }
			});
            console.log('user login: response' , res.data);
			return res.data;
		} catch (error: any) {
			console.error("Error: ", (error as Error).message);
		}
	}
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername : (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail : (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword : (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, _) => {
            state.isLogin = false;
            state.isSignup = false;
        })
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<{ success: boolean, msg: any}>) => {
            const { success, msg } = action.payload;
            if (success){
                state.isSignup = true;
            }
            console.log('Message: ',msg);
            state.isLogin = false;
        })
        builder.addCase(signup.rejected, (state, _) => {
            state.isLogin = false;
            state.isSignup = false;
        })
    }
})

export default userSlice.reducer;
export const { setUsername, setEmail, setPassword } = userSlice.actions;