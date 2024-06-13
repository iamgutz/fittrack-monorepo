import { Button, Modal } from 'flowbite-react';
import { RECORD_DETAIL_ITEMS } from '../constants';
import { useAppSelector } from '@/app/hooks';
import { selectRecordsData } from '@/services/records/recordsSlice';
import { ProgressRecord } from '@/app/definitions';
import { MODALS, useAppContext } from '@/contexts/AppContext';
import { MdDeleteForever } from 'react-icons/md';
import { BiSolidEditAlt } from 'react-icons/bi';

export default function RecordDetail() {
  const { setActiveModal } = useAppContext();
  const record = useAppSelector(selectRecordsData);

  if (!record) {
    return null;
  }

  return (
    <Modal
      show
      onClose={() => setActiveModal('')}
    >
      <Modal.Header>Record Detail</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-3 gap-3">
          {RECORD_DETAIL_ITEMS.map(item => {
            const ItemIcon = item.icon;
            return (
              <div className="flex flex-col items-center">
                <ItemIcon fontSize="large" />
                <div className="flex flex-col items-center gap-1">
                  <span>{item.label}</span>
                  <span>
                    <strong>{`${record[item.key as keyof ProgressRecord]}${
                      item.suffix ? item.suffix : ''
                    }`}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-between">
        <Button
          color="failure"
          onClick={() => setActiveModal(MODALS.DELETE_RECORD)}
        >
          <MdDeleteForever
            size={20}
            className="mr-2"
          />
          Delete Record
        </Button>
        <Button
          color="light"
          onClick={() => setActiveModal(MODALS.EDIT_RECORD)}
        >
          <BiSolidEditAlt
            size={20}
            className="mr-2"
          />
          Edit Record
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
