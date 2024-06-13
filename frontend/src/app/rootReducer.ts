import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/services/user/userSlice';
import profilesReducer from '@/services/profiles/profileSlice';
import sessionReducer from '@/services/session/sessionSlice';
import recordsReducer from '@/services/records/recordsSlice';
import statsReducer from '@/services/stats/statsSlice';

const rootReducer = combineReducers({
    profiles: profilesReducer,
    records: recordsReducer,
    session: sessionReducer,
    stats: statsReducer,
    user: userReducer,
});

export default rootReducer;
