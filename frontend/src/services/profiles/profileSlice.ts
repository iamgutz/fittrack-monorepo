import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppDispatch, type RootState } from '../../app/store';
import ProfilesApi, { type Profile } from './profilesApi';
import { callApi } from '../utils';

const profilesApi = new ProfilesApi();

interface ProfilesState {
  loading: boolean;
  data: Profile[] | null;
  error: string | null;
}

const initialState: ProfilesState = {
  loading: false,
  data: null,
  error: null,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    fetchProfilesStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchProfilesSuccess: (state, action: PayloadAction<Profile[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchProfilesError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

const { fetchProfilesStart, fetchProfilesSuccess, fetchProfilesError } = profilesSlice.actions;

export const fetchProfiles = (id: string) => (dispatch: AppDispatch) =>
  callApi(
    () => profilesApi.fetchProfilesByUserId(id),
    {
      onStart: fetchProfilesStart,
      onSuccess: fetchProfilesSuccess,
      onError: fetchProfilesError,
    },
    dispatch,
  );

export const selectProfilesData = (state: RootState) => state.profiles.data;
export const selectProfilesLoading = (state: RootState) => state.profiles.loading;
export const selectProfilesError = (state: RootState) => state.profiles.error;

export default profilesSlice.reducer;
