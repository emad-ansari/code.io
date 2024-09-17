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
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log('user Signup response: ' , res);
        return res.data;
    } catch (error: any) {
        console.error("Error occured during signup : ", (error as Error).message);
    }
});


export const login = createAsyncThunk("/user/login", async (_, ThunkAPI) => {

    try {
        const store = ThunkAPI.getState() as RootState;
        const { email, password } = store.user;

        const res = await client.post("/user/login", {
            data: {
                email,
                password
            }
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log('user Signup response: ' , res);
        return res.data;
    } catch (error: any) {
        console.error("Error occured during signup : ", (error as Error).message);
    }
});

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
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<{success: boolean, msg: any}>) => {
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
        builder.addCase(login.pending, (state, _) => {
            state.isLogin = false;
            state.isSignup = false;
        })
        builder.addCase(login.fulfilled, (state, action: PayloadAction<{success: boolean, msg: any, token: string}>) => {
            const { success, msg, token } = action.payload;
            if (success){
                state.isLogin = true;
                localStorage.setItem("jwtToken", token);
                
            }
            console.log('Login response msg : ',msg);
            state.isSignup = false;
        })
        builder.addCase(login.rejected, (state, _) => {
            state.isLogin = false;
            state.isSignup = false;
        })
    }
})

export default userSlice.reducer;
export const { setUsername, setEmail, setPassword } = userSlice.actions;