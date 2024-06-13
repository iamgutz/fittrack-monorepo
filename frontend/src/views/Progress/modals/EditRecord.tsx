import { Modal } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchRecords, selectRecordsData } from '@/services/records/recordsSlice';
import { useAppContext } from '@/contexts/AppContext';
import RecordForm from '../RecordForm';

export default function EditRecord() {
  const { setActiveModal, session } = useAppContext();
  const dispatch = useAppDispatch();
  const record = useAppSelector(selectRecordsData);

  const handleOnSuccess = () => {
    dispatch(fetchRecords(session.pid, 'date', 'desc'));
    setActiveModal('');
  };

  return (
    <Modal
      show
      onClose={() => setActiveModal('')}
      size="lg"
    >
      <Modal.Header>Edit Record</Modal.Header>
      <Modal.Body>
        <RecordForm
          isEdit
          onSuccess={handleOnSuccess}
          data={record}
        />
      </Modal.Body>
    </Modal>
  );
}
