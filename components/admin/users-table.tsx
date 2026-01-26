"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  EditIcon,
  MoreHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog from ShadCN
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { dateStringToLocalDate } from "@/utils/date";

type UserTableType = {
  id: string;
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
  const [selectedUser, setSelectedUser] = useState<UserTableType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo<ColumnDef<UserTableType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => row.getValue("name"),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "emailVerified",
        header: "Email Verified",
        cell: ({ row }) => (
          <div className="">
            {row.getValue("emailVerified") ? (
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
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <div>{row.getValue("role")}</div>,
      },
      {
        accessorKey: "banned",
        header: "Banned/Active",
        cell: ({ row }) => (
          <div
            className={`capitalize ${row.getValue("banned") ? "text-red-500" : "text-green-500"}`}
          >
            {row.getValue("banned") ? "Banned" : "Active"}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => dateStringToLocalDate(row.getValue("createdAt")),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => dateStringToLocalDate(row.getValue("updatedAt")),
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <span
            className="flex gap-1 hover:text-blue-500 cursor-pointer"
            onClick={() => handleEdit(row.original)}
          >
            <EditIcon size="16" /> Edit
          </span>
        ),
      },
    ],
    [],
  );

  const handleEdit = (user: UserTableType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  // Handle user details update
  const handleUpdateUser = (updatedUser: UserTableType) => {
    // You can send this updatedUser data to your backend or update the user list here
    console.log(updatedUser);
    closeModal();
  };

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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog for editing user */}
      {selectedUser && isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User: {selectedUser.name}</DialogTitle>
            </DialogHeader>
            <div>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.banned ? "Banned" : "Active"}
              </p>
            </div>
            <Button onClick={closeModal}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
