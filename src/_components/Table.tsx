"use client"

import type { RowData } from "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    setRowSelection: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  }
}


import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// Type
type EnvironmentalData = {
  id: string
  picture: string
  timestamp: string
  status: "processing" | "completed"
  humidity: number
  temperature: number
  moisture: number
  pesticideSprayTime: string
}

// Example static data
const data: EnvironmentalData[] = [
 {
    id: "abc123",
    picture: "https://picsum.photos/100?random=1",
    timestamp: "2025-09-26T10:00:00Z",
    status: "completed",
    humidity: 78,
    temperature: 22,
    moisture: 65,
    pesticideSprayTime: "15 minutes",
  },
  {
    id: "def456",
    picture: "https://imgs.search.brave.com/NzPOS2WJ60hcOPNfpOp4IN8upnPeknqKVb2sIzocjvM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzI1LzE4LzA1/LzM2MF9GXzEwMjUx/ODA1NzhfQmpVNVc1/YkpoWkd5a0VBMkFV/VmpxemZ6VGRyWlE0/S3MuanBn",
    timestamp: "2025-09-26T11:00:00Z",
    status: "processing",
    humidity: 82,
    temperature: 24,
    moisture: 68,
    pesticideSprayTime: "30 minutes",
  },
  {
    id: "ghi789",
    picture: "https://picsum.photos/100?random=3",
    timestamp: "2025-09-26T12:00:00Z",
    status: "completed",
    humidity: 80,
    temperature: 23,
    moisture: 70,
    pesticideSprayTime: "20 minutes",
  },
  {
    id: "jkl012",
    picture: "https://picsum.photos/100?random=4",
    timestamp: "2025-09-26T13:00:00Z",
    status: "processing",
    humidity: 76,
    temperature: 25,
    moisture: 66,
    pesticideSprayTime: "25 minutes",
  },
  {
    id: "mno345",
    picture: "https://picsum.photos/100?random=5",
    timestamp: "2025-09-26T14:00:00Z",
    status: "completed",
    humidity: 79,
    temperature: 24,
    moisture: 69,
    pesticideSprayTime: "15 minutes",
  },
  {
    id: "pqr678",
    picture: "https://picsum.photos/100?random=6",
    timestamp: "2025-09-26T15:00:00Z",
    status: "completed",
    humidity: 81,
    temperature: 26,
    moisture: 72,
    pesticideSprayTime: "30 minutes",
  },
]

// Columns
export const columns: ColumnDef<EnvironmentalData>[] = [
  {
    id: "select",
    header: "Select",
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          if (value) {
            // allow only this row to be selected
            table.options.meta?.setRowSelection({ [row.id]: true })
          } else {
            table.options.meta?.setRowSelection({})
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "processing" | "completed"
      return (
        <Badge variant="outline" className="flex items-center gap-2 capitalize">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "completed" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {status}
        </Badge>
      )
    },
  },
  { accessorKey: "id", header: "ID" },
  {
  accessorKey: "picture",
  header: "Picture",
  cell: ({ row }) => {
    const url = row.getValue("picture") as string
    return (
      <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-md bg-gray-100">
        <img
          src={url}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
    )
  },
},

  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const rawTimestamp = row.getValue("timestamp") as string
      const date = parseISO(rawTimestamp)
      const formatted = format(date, "dd MMM yyyy, hh:mm a")
      return <span>{formatted}</span>
    },
  },
  { accessorKey: "humidity", header: "Humidity (%)" },
  { accessorKey: "temperature", header: "Temperature (°C)" },
  { accessorKey: "moisture", header: "Moisture (%)" },
  { accessorKey: "pesticideSprayTime", header: "Spray Time" },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(record.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function EnvironmentalDataTable() {
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 3,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination, rowSelection },
    onRowSelectionChange: setRowSelection,
    meta: {
      setRowSelection,
    },
  })

  return (
    <div className="h-full w-full flex flex-col p-5">
      {/* Pagination & Selected Row Info → Moved UP */}
      <div className="flex items-center justify-between space-x-2 py-2 px-4 border-b mb-2">
        <div className="text-sm text-muted-foreground">
          Selected Row:{" "}
          {table.getSelectedRowModel().rows.length > 0
            ? table.getSelectedRowModel().rows[0].original.id
            : "None"}
        </div>
        <div className="flex space-x-2">
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

      {/* Table Wrapper */}
      <div className="flex-1 overflow-auto rounded-md border bg-card">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.getIsSelected() ? "bg-blue-100" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
    </div>
  )
}

