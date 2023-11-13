// Custom Table Columns
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';


export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    // row.original comes from the tanstack table object
    cell: ({row}) => <CellAction data={row.original}/>,
  }
];
