import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import { createRecord, setRecordData, updateRecord } from '@/services/records/recordsSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { FIELD_IDS, RECORD_FIELDS } from './constants';
import { selectSession } from '@/services/session/sessionSlice';
import { Button } from 'flowbite-react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNotify } from '@/contexts/NotifyContext';
import { ProgressRecord } from '@/app/definitions';
import { RiHeartAdd2Line } from 'react-icons/ri';

interface RecordFormProps {
  isEdit: boolean;
  data?: ProgressRecord | null;
  onSuccess?: () => void;
}

const TODAY = new Date().toISOString().split('T')[0];

const defaultFormValues = _reduce(
  FIELD_IDS,
  (result, field) => {
    const newResult = {
      ...result,
      [field]: field === 'date' ? dayjs(TODAY).format('YYYY-MM-DD') : '',
    };
    return newResult;
  },
  {} as ProgressRecord,
);

export default function RecordForm({ isEdit, data, onSuccess }: RecordFormProps) {
  const [formValues, setFormValues] = useState<ProgressRecord>(defaultFormValues);
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);
  const { notify } = useNotify();

  const onFieldChange = (fieldId: string, value: string | number) => {
    setFormValues({
      ...formValues,
      [fieldId]: value,
    });
  };

  const onSubmit = async () => {
    const submitAction = isEdit ? updateRecord : createRecord;

    const height = parseFloat(formValues[FIELD_IDS.HEIGHT]).toFixed(2);
    const weight = parseFloat(formValues[FIELD_IDS.WEIGHT]).toFixed(2);
    const bmi = parseFloat(formValues[FIELD_IDS.BMI]).toFixed(1);
    const bodyFat = parseFloat(formValues[FIELD_IDS.BODY_FAT]).toFixed(2);
    const muscle = parseFloat(formValues[FIELD_IDS.MUSCLE]).toFixed(2);
    const visceral = parseInt(formValues[FIELD_IDS.VISCERAL], 10);
    const calories = parseInt(formValues[FIELD_IDS.CALORIES], 10);
    const metabolicAge = parseInt(formValues[FIELD_IDS.METABOLIC_AGE], 10);

    const profileId = session.pid;

    const result = await dispatch(
      submitAction({
        ...formValues,
        height,
        weight,
        bmi,
        bodyFat,
        muscle,
        visceral,
        calories,
        metabolicAge,
        profileId,
      }),
    );

    if (createRecord.rejected.match(result) || updateRecord.rejected.match(result)) {
      notify({ type: 'error', message: result.error.message || '' });
    }

    if (createRecord.fulfilled.match(result) || updateRecord.fulfilled.match(result)) {
      const { record } = result.payload;
      dispatch(setRecordData(record as any));
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, [data, setFormValues]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {_map(RECORD_FIELDS, (field, key) => {
          return (
            <div key={key}>
              {field.type === 'date' ? (
                <DatePicker
                  label={field.label}
                  value={formValues[field.id] ? (dayjs(formValues[field.id]) as any) : dayjs(TODAY)}
                  onChange={value =>
                    onFieldChange(field.id, dayjs(value).format('YYYY-MM-DD') as any)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: field.required,
                    },
                  }}
                />
              ) : (
                <TextField
                  required={field.required}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formValues[field.id]}
                  onChange={e => onFieldChange(field.id, e.target.value)}
                  fullWidth
                />
              )}
            </div>
          );
        })}
      </div>
      <Button
        color="blue"
        onClick={onSubmit}
      >
        <RiHeartAdd2Line
          size={20}
          className="mr-2"
        />
        Submit
      </Button>
    </div>
  );
}
