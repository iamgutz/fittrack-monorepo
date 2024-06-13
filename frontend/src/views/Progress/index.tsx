import NavBar from '@/components/NavBar';
import { Button, TextInput } from 'flowbite-react';
import RecordsTable from './RecordsTable';
import { RECORDS_TABLE_COLUMNS } from './constants';
import Modals from './modals';
import { RiHeartAdd2Line, RiSearchLine } from 'react-icons/ri';
import { MODALS, useAppContext } from '@/contexts/AppContext';

export default function ProgressView() {
  const { setActiveModal } = useAppContext();

  return (
    <div className="flex flex-col gap-3">
      <NavBar className="!bg-gray-200 !rounded-md">
        <TextInput icon={RiSearchLine} />
        <Button
          color="blue"
          onClick={() => setActiveModal(MODALS.ADD_RECORD)}
        >
          <RiHeartAdd2Line
            size={20}
            className="mr-2"
          />
          Add Record
        </Button>
      </NavBar>
      <RecordsTable columns={RECORDS_TABLE_COLUMNS} />
      <Modals />
    </div>
  );
}
