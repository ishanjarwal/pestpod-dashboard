"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"

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

// Example static data (replace with API fetch later)
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
    picture: "https://picsum.photos/100?random=2",
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

// Columns definition
export const columns: ColumnDef<EnvironmentalData>[] = [
  {
    id: "select",
    header: () => null,
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          table.resetRowSelection()
          row.toggleSelected(!!value)
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
        <img
          src={url}
          alt="thumbnail"
          width={60}
          height={60}
          className="rounded-md"
        />
      )
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Timestamp
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    enableHiding: false,
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
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 4,
  })
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
  })

  async function fetchData(){
    try{
      const respone= await fetch('http/localhost:8080/',{
        method: "GET",
      })

      if(!respone.ok){
        const data= await respone.json();
        console.error(data.error);
        return;
      }

      const Data=await respone.json();

      // use the context setter function over here ishan - setData(Data);

    }
    catch(error: any){
      console.error("Error fetching the data :",error.message);
    }
  }

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter ID..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border px-5 py-3 bg-card mt-2">
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

      {/* Pagination + Selection Info */}
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
    </div>
  )
}
