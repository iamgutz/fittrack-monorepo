import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../../app/store';

interface SessionState {
  uid: string;
  pid: string;
  rid: string;
}

// TODO: Grab UID from login
const initialState: SessionState = {
  uid: '1', // user id
  pid: '1', // profile id
  rid: '', // record id
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setPid: (state, action: PayloadAction<string>) => {
      state.pid = action.payload;
    },
    setRid: (state, action: PayloadAction<string>) => {
      state.rid = action.payload;
    },
  },
});

export const { setPid, setRid } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;
