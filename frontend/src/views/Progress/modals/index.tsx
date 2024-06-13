import { MODALS, useAppContext } from '@/contexts/AppContext';
import RecordDetail from './RecordDetail';
import DeleteRecord from './DeleteRecord';
import AddRecord from './AddRecord';
import EditRecord from './EditRecord';

export default function Modals() {
  const { activeModal } = useAppContext();
  return (
    <>
      {activeModal === MODALS.RECORD_DETAIL && <RecordDetail />}
      {activeModal === MODALS.DELETE_RECORD && <DeleteRecord />}
      {activeModal === MODALS.ADD_RECORD && <AddRecord />}
      {activeModal === MODALS.EDIT_RECORD && <EditRecord />}
    </>
  );
}
