import { ColumnsList } from '@/app/definitions';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useAppContext } from '@/contexts/AppContext';
import { fetchRecords, selectRecordsList } from '@/services/records/recordsSlice';
import { Table } from 'flowbite-react';
import { useEffect } from 'react';
import { CellComponentFallback } from './cellComponents';

interface RecordsTableProps {
  columns: ColumnsList;
}

export default function RecordsTable({ columns }: RecordsTableProps) {
  const dispatch = useAppDispatch();
  const { session } = useAppContext();
  const records = useAppSelector(selectRecordsList) || [];

  useEffect(() => {
    dispatch(fetchRecords(session.pid, 'date', 'desc'));
  }, [dispatch, session.pid]);

  return (
    <Table
      striped
      hoverable
    >
      <Table.Head>
        {columns.map(column => (
          <Table.HeadCell key={column.key}>{column.label}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {records.map(record => {
          return (
            <Table.Row key={record.id}>
              {columns.map(column => {
                const CellComponent = column.renderComponent || CellComponentFallback;
                return (
                  <Table.Cell>
                    <CellComponent
                      data={record}
                      id={column.key}
                    />
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
