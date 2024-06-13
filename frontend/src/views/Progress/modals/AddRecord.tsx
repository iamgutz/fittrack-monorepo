import { Modal } from 'flowbite-react';
import { useAppDispatch } from '@/app/hooks';
import { fetchRecords } from '@/services/records/recordsSlice';
import { useAppContext } from '@/contexts/AppContext';
import RecordForm from '../RecordForm';

export default function AddRecord() {
  const { setActiveModal, session } = useAppContext();
  const dispatch = useAppDispatch();

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
      <Modal.Header>Add Record</Modal.Header>
      <Modal.Body>
        <RecordForm
          isEdit={false}
          onSuccess={handleOnSuccess}
        />
      </Modal.Body>
    </Modal>
  );
}
