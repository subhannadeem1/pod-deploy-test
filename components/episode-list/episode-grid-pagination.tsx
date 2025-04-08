import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EpisodeGridPaginationProps<TData> {
  table: Table<TData>;
}

export function EpisodeGridPagination<TData>({ table }: EpisodeGridPaginationProps<TData>) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100">

      <div className="flex items-center space-x-2">
        
        <span className="text-sm text-gray-700">Rows per page:</span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-20 bg-white text-gray-800 border border-gray-300">
            <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
          </SelectTrigger>

          <SelectContent side="top" className="bg-white text-gray-800">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page Indicator */}
      <div className="mt-2 md:mt-0 text-sm text-gray-700">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2 mt-2 md:mt-0">
        <Button
          variant="outline"
          className="hidden md:flex h-8 w-8 p-0 border-gray-500"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First Page"
        >
          <DoubleArrowLeftIcon className="h-4 w-4 text-gray-700" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 border-gray-500"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous Page"
        >
          <ChevronLeftIcon className="h-4 w-4 text-gray-700" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 border-gray-500"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next Page"
        >
          <ChevronRightIcon className="h-4 w-4 text-gray-700" />
        </Button>
        <Button
          variant="outline"
          className="hidden md:flex h-8 w-8 p-0 border-gray-500"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last Page"
        >
          <DoubleArrowRightIcon className="h-4 w-4 text-gray-700" />
        </Button>
      </div>
    </div>
  );
}