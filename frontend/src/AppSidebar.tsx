import Sidebar from './components/Sidebar';
import { RiLogoutBoxLine, RiSettings4Line, RiMenuFoldLine } from 'react-icons/ri';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import { VIEWS, useAppContext } from './contexts/AppContext';
import AppLogo from './components/AppLogo';
import clsx from 'clsx';

export default function AppSidebar({ className }: { className?: string }) {
  const { activeView, setActiveView, setDrawerOpen } = useAppContext();
  const onChangeView = (view: string) => {
    setActiveView(view);
    setDrawerOpen(false);
  };
  return (
    <Sidebar className={clsx(['flex flex-col', className])}>
      <div className="flex items-center justify-between gap-3">
        <AppLogo />
        <button
          className="h-10 w-10 md:hidden flex justify-center items-center rounded-full hover:bg-gray-200"
          onClick={() => setDrawerOpen(false)}
        >
          <RiMenuFoldLine size={20} />
        </button>
      </div>
      <Sidebar.Items className="flex-1">
        <Sidebar.Item active={activeView === VIEWS.OVERVIEW}>
          <button
            className="flex items-center gap-3 w-full"
            onClick={() => onChangeView(VIEWS.OVERVIEW)}
          >
            <HiMiniSquares2X2 size={20} />
            <span>Overview</span>
          </button>
        </Sidebar.Item>
        <Sidebar.Item active={activeView === VIEWS.PROGRESS}>
          <button
            className="flex items-center gap-3 w-full"
            onClick={() => onChangeView(VIEWS.PROGRESS)}
          >
            <BiSolidBarChartAlt2 size={20} />
            <span>Progress</span>
          </button>
        </Sidebar.Item>
      </Sidebar.Items>
      <Sidebar.Items>
        <Sidebar.Item>
          <button
            className="flex items-center gap-3 w-full"
            onClick={() => {}}
          >
            <RiSettings4Line size={20} />
            <span>Settings</span>
          </button>
        </Sidebar.Item>
        <Sidebar.Item>
          <button
            className="flex items-center gap-3 w-full"
            onClick={() => {}}
          >
            <RiLogoutBoxLine size={20} />
            <span>Logout</span>
          </button>
        </Sidebar.Item>
      </Sidebar.Items>
    </Sidebar>
  );
}
