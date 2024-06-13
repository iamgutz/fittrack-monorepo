import { Drawer } from 'flowbite-react';
import { VIEWS, useAppContext } from '@/contexts/AppContext';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { RiMenuUnfoldLine } from 'react-icons/ri';

import Overview from './views/Overview';
import NavBar from './components/NavBar';
import Avatar from './components/Avatar';
import { Dropdown } from 'flowbite-react';
import WelcomeUser from './components/WelcomeUser';
import AppLogo from './components/AppLogo';
import ProgressView from './views/Progress';
import AppSidebar from './AppSidebar';
import Card from './components/Card';

function App() {
  const { activeView, profile, profiles, user, switchProfile, setDrawerOpen, drawerOpen } =
    useAppContext();

  return (
    <div className="flex flex-col w-full h-full p-3 mx-auto">
      <div className="flex h-full gap-3 relative">
        <Card className="w-64 pt-3 hidden md:flex h-[calc(100vh-1.5rem)] sticky top-0">
          <AppSidebar />
        </Card>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <NavBar>
            <div className="flex items-center gap-3">
              <button
                className="h-10 w-10 flex md:hidden justify-center items-center rounded-full hover:bg-gray-200"
                onClick={() => setDrawerOpen(true)}
              >
                <RiMenuUnfoldLine size={20} />
              </button>
              <AppLogo className="md:hidden" />
            </div>
            <div className="flex gap-3">
              <button className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200">
                <IoChatbubbleEllipsesOutline size={20} />
              </button>
              <button className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200">
                <IoMdNotificationsOutline size={20} />
              </button>

              {user && (
                <Dropdown
                  label=""
                  renderTrigger={() => (
                    <button className="flex items-center gap-3 hover:bg-gray-100 rounded-full pr-3">
                      <Avatar
                        stringAvatar={profile?.name}
                        size="sm"
                        outline
                      />
                      <WelcomeUser
                        className="hidden md:flex"
                        username={user?.username}
                        profileName={profile?.name}
                      />
                    </button>
                  )}
                >
                  <Dropdown.Item className="flex-col items-start">
                    <WelcomeUser
                      className="md:hidden"
                      username={user?.username}
                      profileName={profile?.name}
                    />
                    <span className="font-semibold">Your Profiles</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {profiles.map(p => (
                    <Dropdown.Item
                      className="gap-3"
                      onClick={() => switchProfile(p.id)}
                    >
                      <Avatar
                        stringAvatar={p?.name}
                        size="xs"
                        outline
                      />
                      {p.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              )}
            </div>
          </NavBar>
          <div className="py-3">
            {activeView === VIEWS.OVERVIEW && <Overview />}
            {activeView === VIEWS.PROGRESS && <ProgressView />}
          </div>
        </div>
      </div>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <AppSidebar />
      </Drawer>
    </div>
  );
}

export default App;
