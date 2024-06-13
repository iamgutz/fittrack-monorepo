import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppDispatch, type RootState } from '../../app/store';
import RecordsApi from './recordsApi';
import { callApi } from '../utils';
import { ProgressRecord } from '@/app/definitions';

const recordsApi = new RecordsApi();

interface RecordsState {
  loading: boolean;
  list: ProgressRecord[] | null;
  data: ProgressRecord | null;
  error: string | null;
  isDeleting: boolean;
}

const initialState: RecordsState = {
  loading: false,
  list: null,
  data: null,
  error: null,
  isDeleting: false,
};

export const updateRecord = createAsyncThunk(
  'records/updateRecord',
  async (data: ProgressRecord) => {
    return recordsApi.updateRecord(data);
  },
);

export const createRecord = createAsyncThunk(
  'records/createRecord',
  async (data: ProgressRecord) => {
    return recordsApi.createRecord(data);
  },
);

export const deleteRecord = createAsyncThunk('records/deleteRecord', async (id: string) => {
  return recordsApi.deleteRecord(id);
});

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    fetchRecordsStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchRecordsSuccess: (state, action: PayloadAction<ProgressRecord[]>) => {
      state.loading = false;
      state.list = action.payload;
      state.error = null;
    },
    fetchRecordsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    setRecordData: (state, action: PayloadAction<ProgressRecord | null>) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createRecord.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || null;
      });

    builder
      .addCase(updateRecord.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || null;
      });

    builder
      .addCase(deleteRecord.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteRecord.fulfilled, state => {
        state.isDeleting = false;
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.error?.message || null;
      });
  },
});

export const { fetchRecordsStart, fetchRecordsSuccess, fetchRecordsError, setRecordData } =
  recordsSlice.actions;

export const fetchRecords =
  (pid: string, sortBy?: string, order?: string) => (dispatch: AppDispatch) =>
    callApi(
      () => recordsApi.fetchRecordsByProfileId(pid, sortBy, order),
      {
        onStart: fetchRecordsStart,
        onSuccess: fetchRecordsSuccess,
        onError: fetchRecordsError,
      },
      dispatch,
    );

export const selectRecordsList = (state: RootState) => state.records.list;
export const selectRecordsData = (state: RootState) => state.records.data;
export const selectRecordsLoading = (state: RootState) => state.records.loading;
export const selectRecordsError = (state: RootState) => state.records.error;
export const selectRecordsIsDeleting = (state: RootState) => state.records.isDeleting;

export default recordsSlice.reducer;
