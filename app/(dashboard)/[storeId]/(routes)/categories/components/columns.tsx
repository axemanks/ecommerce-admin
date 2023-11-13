// Custom Table Columns
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';


export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({row}) => row.original.billboardLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    // row.original comes from the tanstack table object
    cell: ({row}) => <CellAction data={row.original}/>,
  }
];
