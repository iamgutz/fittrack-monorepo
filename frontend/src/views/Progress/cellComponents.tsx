import { ProgressRecord } from '@/app/definitions';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { MODALS, useAppContext } from '@/contexts/AppContext';
import { selectRecordsList, setRecordData } from '@/services/records/recordsSlice';
import { setRid } from '@/services/session/sessionSlice';

export interface CellComponentProps {
  data: Record<string, any>;
  id: string;
}

export const CellComponentFallback = ({ data, id }: CellComponentProps) => <span>{data[id]}</span>;

export const WeightCell = ({ data, id }: CellComponentProps) => <span>{`${data[id]} kg`}</span>;

export const KgPercentageCell = ({ data, id }: CellComponentProps) => {
  const kgId = `${id}Kg`;
  return (
    <span className="flex flex-col">
      <span>{`${data[kgId]} kg`}</span>
      <span className="caption">{`${data[id]}%`}</span>
    </span>
  );
};

export const DateCell = ({ data, id }: CellComponentProps) => {
  const { setActiveModal } = useAppContext();
  const dispatch = useAppDispatch();
  const records = useAppSelector(selectRecordsList) || [];
  const recordId = data.id;

  const showRecordDetail = () => {
    const record: ProgressRecord | undefined = records?.find(r => r.id === recordId);
    dispatch(setRid(recordId));
    if (record !== undefined) {
      dispatch(setRecordData(record));
      setActiveModal(MODALS.RECORD_DETAIL);
    }
  };

  return (
    <button
      onClick={showRecordDetail}
      className="text-blue-600 font-semibold hover:underline"
    >
      {data[id]}
    </button>
  );
};
