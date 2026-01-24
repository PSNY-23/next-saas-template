'use client';

import * as React from 'react';
import {useState, useMemo} from "react"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'; // Import Dialog from ShadCN
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { dateStringToLocalDate } from '@/utils/date';

type UserTableType = {
  name: string;
  email: string;
  emailVerified: boolean;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
  banned: boolean | null;
};

interface UserTableProps {
  userList: UserTableType[];
}



export function UserTable({ userList }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState()

  const columns = useMemo<ColumnDef<UserTableType>[]>(() =>  [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    cell: ({ row }) => (
      <div className="">
        {row.getValue('emailVerified') ? (
          <span className="flex gap-2">
            <FaCheckCircle className="text-green-500 text-lg" />
            Verified
          </span>
        ) : (
          <span className="flex gap-2">
            <MdCancel className="text-red-500 text-lg" />
            Unverified
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div>{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'banned',
    header: 'Banned/Active',
    cell: ({ row }) => (
      <div className={`capitalize ${row.getValue('banned') ? 'text-red-500' : 'text-green-500'}`}>
        {row.getValue('banned') ? 'Banned' : 'Active'}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => dateStringToLocalDate(row.getValue('createdAt'))
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => dateStringToLocalDate(row.getValue('updatedAt'))
  },
]
  , []);
  const table = useReactTable({
    data: userList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">  
      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                     
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table footer paginiation */}
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}

      {/* Dialog for editing user */}
      {/* {selectedUser && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User: {selectedUser.name}</DialogTitle>
            </DialogHeader>
            <div>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedUser.banned ? "Banned" : "Active"}</p>
              <p><strong>Ban Expires:</strong> {selectedUser.banExpires ? new Date(selectedUser.banExpires).toLocaleDateString() : "N/A"}</p>
            </div>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  );
}
