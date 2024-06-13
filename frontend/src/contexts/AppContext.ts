import { Profile, User } from '@/app/definitions';
import { createContext, useContext } from 'react';

export const VIEWS = {
  OVERVIEW: 'overview',
  PROGRESS: 'progress',
  MAIN: 'main',
  PROFILE: 'profile',
  RECORD: 'record',
  RECORD_ADD: 'record_add',
  RECORD_EDIT: 'record_edit',
};

export const MODALS = {
  RECORD_DETAIL: 'record_detail',
  DELETE_RECORD: 'delete_record',
  ADD_RECORD: 'add_record',
  EDIT_RECORD: 'edit_record',
};

interface AppContextValue {
  activeView: string;
  setActiveView: (viewName: string) => void;
  profile: Profile | undefined;
  profiles: Profile[];
  session: any;
  user: User | undefined;
  switchProfile: (pid: string) => void;
  activeModal: string;
  setActiveModal: (modalName: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
