import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../app/store';
import StatsApi, { type FetchParams, type StatsType } from './statsApi';

const statsApi = new StatsApi();

interface StatsState {
    loading: boolean;
    data: StatsType | null;
    error: string | null;
}

const initialState: StatsState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchStats = createAsyncThunk('states/fetchStats', async (params: FetchParams) => {
    return statsApi.fetchStats(params);
});

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchStats.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || null;
            });
    },
});

export const selectStatsData = (state: RootState) => state.stats.data;
export const selectStatsLoading = (state: RootState) => state.stats.loading;
export const selectStatsError = (state: RootState) => state.stats.error;

export default statsSlice.reducer;
