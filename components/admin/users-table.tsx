"use client";

import { useState, useMemo } from "react";
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
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import { dateStringToLocalDate } from "@/utils/date";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { UserProfileDialog } from "./user-profile-dialog";

import { UserTableType } from "@/types/admin";

interface UserTableProps {
  userList: UserTableType[];
  onRefetch?: () => void;
}
export function UserTable({ userList, onRefetch }: UserTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedUser = useMemo(() => {
    if (!selectedUserId) return null;
    return userList.find((u) => u.id === selectedUserId) || null;
  }, [selectedUserId, userList]);

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
            onClick={() => handleEdit(row.original.id)}
          >
            <EditIcon size="16" /> Edit
          </span>
        ),
      },
    ],
    [],
  );

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };
  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
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
      <UserProfileDialog
        user={selectedUser}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onRefetch={onRefetch}
      />
    </div>
  );
}
