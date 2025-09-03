import api from "@/api/client";
import { APIResponse } from "@/lib/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";



interface Progress {
    solved: number;
    total: number;
}
interface UserProfile {
    username: string;
    easyProgress: Progress;
    mediumProgress: Progress;
    hardProgress: Progress;
    overAllProgress: Progress;
    currentStreak: number;
    longestStreak: number;
}

export interface UserState {
    loading: boolean;
    profile: UserProfile | null
} 

export const initialUserState: UserState = {
    loading: true,
    profile: null
}
export const getUserProfile = createAsyncThunk<APIResponse<UserProfile>> ("/user/getUserProfile", async(_, ThunkAPI) => {
    try {
        const response = await api.get('/user/profile');
        const data = response.data;
        console.log('this is response data; ', data)
        return data;
    }
    catch(error: any) {
        return ThunkAPI.rejectWithValue(error);
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action: PayloadAction<APIResponse<UserProfile>>) => {
            state.loading = false;
            const {success, data} = action.payload;
            if (success && data) {
                state.profile = data;
            }
        });
        builder.addCase(getUserProfile.rejected, (state) => {
            state.loading = false;
        });
    }
})

export default userSlice.reducer;
