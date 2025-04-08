"use client"

import axios from "axios"
import Link from "next/link"
import { Barlow } from "@/fonts/Barlow"
import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { EpisodeGridPagination } from "./episode-grid-pagination"
import { EpisodeType } from "@/types/EpisodeType"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EpisodeURL } from "@/types/EpisodeURL"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/podcasts/${slug}`)
  return response.data
}

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  })
}

const getQualityColor = (quality: string | undefined) => {
  switch (quality) {
    case "excellent":
      return "bg-green-500"
    case "fair":
      return "bg-yellow-500"
    case "poor":
      return "bg-red-500"
    case "unavailable":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

export const columns: ColumnDef<EpisodeType>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center justify-between text-gray-800 text-sm font-medium px-2 py-1 hover:bg-gray-50 rounded-sm transition-all"
      >
        <span>Episode</span>
        <CaretSortIcon className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/podcast/${encodeURIComponent(
          row.getValue("podcast_id")
        )}/${encodeURIComponent(row.getValue("number"))}`}
        className="block px-2 py-1 text-sm text-gray-700 hover:text-blue-500 transition-colors truncate"
        aria-label={`Episode ${row.getValue("number")}`}
      >
        {row.getValue("number")}
      </Link>
    ),
    size: 1,
  },
  {
    accessorKey: "title",
    header: () => (
      <span className="text-sm font-medium text-gray-800 px-2">Title</span>
    ),
    cell: ({ row }) => (
      <Link
        href={`/podcast/${encodeURIComponent(
          row.getValue("podcast_id")
        )}/${encodeURIComponent(row.getValue("number"))}`}
        className="block px-2 py-1 text-sm text-gray-700 hover:text-blue-500 transition-colors whitespace-normal"
        aria-label={row.getValue("title")}
      >
        {row.getValue("title")}
      </Link>
    ),
    enableSorting: false,
    size: 2,
  },
  {
    accessorKey: "podcast_id",
    header: () => <span className="hidden" />,
    cell: ({ row }) => <span className="hidden" />,
    size: 2,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center justify-between text-gray-800 text-sm font-medium px-2 py-1 hover:bg-gray-50 rounded-sm transition-all"
      >
        <span>Published</span>
        <CaretSortIcon className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/podcast/${encodeURIComponent(
          row.getValue("podcast_id")
        )}/${encodeURIComponent(row.getValue("number"))}`}
        className="block px-2 py-1 text-sm text-gray-700 hover:text-blue-500 transition-colors"
        aria-label={`Published on ${formatDate(row.getValue("created_at"))}`}
      >
        {formatDate(row.getValue("created_at"))}
      </Link>
    ),
    size: 1,
  },
  {
    accessorKey: "quality",
    header: () => (
      <span className="text-sm font-medium text-gray-800 px-2">Quality</span>
    ),
    cell: ({ row }) => (
      <div
        className={`h-5 w-5 ml-4 rounded-full ${getQualityColor(row.getValue("quality"))} shadow-sm relative`}
        aria-label={row.getValue("quality") || "unavailable"}
        title={row.getValue("quality") || "unavailable"}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.4)"
        }}
      ></div>
    ),       
    size: 1,
  },
]

export default function EpisodeGrid(url: EpisodeURL) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const { data, isLoading, error } = useQuery<EpisodeType[]>({
    queryKey: ["detail-podcast", url.params.slug],
    queryFn: () => fetchDetails(url.params.slug),
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-6 bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    )

  if (error)
    return (
      <div className="text-center text-red-500 py-6 bg-gray-100 text-sm font-medium">
        Failed to load episodes. Please try again later.
      </div>
    )

  const table = useReactTable({
    data: data || [],
    columns,
    initialState: {
      pagination: {
        pageSize: 20
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className={`bg-gray-100 shadow-lg rounded-sm overflow-hidden ${Barlow.className}`}>
      {/* Table Filter */}
      <div className="flex items-center px-3 py-2 bg-gray-50 border-b border-gray-200">
        <Input
          placeholder="Search episodes..."
          value={(table.getColumn("title")?.getFilterValue() as string) || ""}
          onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
          className="w-full max-w-sm bg-white text-gray-800 border border-gray-200 rounded-sm text-sm px-2 py-1 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          {/* Table Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-2 py-1 text-sm text-gray-700 whitespace-normal"
                    >
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No episodes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <EpisodeGridPagination table={table} />
    </div>
  )
}
