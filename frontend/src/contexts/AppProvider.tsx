import { ReactNode, useEffect, useState } from 'react';
import { AppContext, VIEWS } from './AppContext';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProfiles, selectProfilesData } from '@/services/profiles/profileSlice';
import { selectSession, setPid } from '@/services/session/sessionSlice';
import { fetchUser, selectUserData } from '@/services/user/userSlice';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const dispatch = useAppDispatch();
  const [activeView, setActiveView] = useState(VIEWS.OVERVIEW);
  const [activeModal, setActiveModal] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const session = useAppSelector(selectSession);
  const profiles = useAppSelector(selectProfilesData) || [];
  const user = useAppSelector(selectUserData) || undefined;
  const profile = profiles?.find(p => p.id === session.pid);

  const switchProfile = (pid: string) => {
    dispatch(setPid(pid));
  };

  useEffect(() => {
    dispatch(fetchUser(session.uid));
  }, [dispatch, session.uid]);

  useEffect(() => {
    dispatch(fetchProfiles(session.uid));
  }, [dispatch, session.uid]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        profile,
        session,
        profiles,
        user,
        switchProfile,
        activeModal,
        setActiveModal,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
