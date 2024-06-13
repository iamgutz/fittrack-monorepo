import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AppDispatch, type RootState } from "../../app/store";
import UserApi, { type User } from './userApi';
import { callApi } from "../utils";

const userApi = new UserApi();

interface UserState {
    loading: boolean;
    data: User | null;
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    data: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchUserError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
    },
});

const {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserError,
} = userSlice.actions;

export const fetchUser = (id: string) => (dispatch: AppDispatch) => callApi(
    () => userApi.fetchUser(id),
    {
        onStart: fetchUserStart,
        onSuccess: fetchUserSuccess,
        onError: fetchUserError,
    },
    dispatch
);

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;