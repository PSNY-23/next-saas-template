"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog" // Import Dialog from ShadCN
import { toast } from "sonner"

export type User = {
  id: string
  image: string | null
  name: string
  role: string | null
  email: string
  createdAt: Date
  updatedAt: Date
  emailVerified: boolean
  banReason: string | null
  banned: boolean | null
  banExpires: Date | null
}

interface UserTableProps {
  userList: User[]
}

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className={`capitalize ${row.getValue("banned") ? "text-red-500" : "text-green-500"}`}>
        {row.getValue("banned") ? "Banned" : "Active"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    accessorKey: "banExpires",
    header: "Ban Expires",
    cell: ({ row }) => {
      const banExpires = row.getValue("banExpires")
      return banExpires ? new Date(banExpires).toLocaleDateString() : "N/A"
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(user)}>
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              {user.banned ? (
                <DropdownMenuItem>Unban User</DropdownMenuItem>
              ) : (
                <DropdownMenuItem>Ban User</DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function UserTable({ userList }: UserTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  const table = useReactTable({
    data: userList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (selection) => {
      setRowSelection(selection)
      const selectedRows = table.getSelectedRowModel().rows
      setSelectedUsers(selectedRows.map((row) => row.original))
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Function to handle user editing
  const handleEdit = (user: User) => {
    setSelectedUser(user)  // Set the selected user when Edit button is clicked
    setIsDialogOpen(true)   // Open the dialog
  }

  // Function to close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false)  // Close the dialog
    setSelectedUser(null)   // Clear the selected user
  }

  return (
    <div className="w-full">

      {/* Search and dropdwon */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table footer paginiation */}
      <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>

      {/* Dialog for editing user */}
      {selectedUser && (
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
      )}
    </div>
  )
}
