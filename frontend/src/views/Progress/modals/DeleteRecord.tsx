import { useAppDispatch } from '@/app/hooks';
import { useAppContext } from '@/contexts/AppContext';
import { deleteRecord, fetchRecords } from '@/services/records/recordsSlice';
import { Button, Modal } from 'flowbite-react';
import { MdDeleteForever } from 'react-icons/md';

export default function DeleteRecord() {
  const { setActiveModal, session } = useAppContext();
  const dispatch = useAppDispatch();

  const onClose = () => {
    setActiveModal('');
  };
  const onDelete = async () => {
    const result = await dispatch(deleteRecord(session.rid));
    if (deleteRecord.fulfilled.match(result)) {
      onClose();
      dispatch(fetchRecords(session.pid, 'date', 'desc'));
    }
  };

  return (
    <Modal
      show
      onClose={onClose}
      size="sm"
    >
      <Modal.Header>Delete Record?</Modal.Header>
      <Modal.Body className="flex flex-col">
        <p>
          Are you sure you want to delete this record? <strong>This action cannot be undone</strong>
          .
        </p>
        <Button
          color="failure"
          onClick={onDelete}
          className="w-full mt-5"
        >
          <MdDeleteForever
            size={20}
            className="mr-2"
          />
          Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
}
