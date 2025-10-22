// ReusableTable.jsx
// Single-file reusable TanStack Table (v8) component styled with Tailwind CSS
// Install:
// npm install @tanstack/react-table classnames

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import classNames from "classnames";

/**
 * Props
 * - columns: TanStack column definitions
 * - data: array of row data
 * - initialState: optional initial table state (sorting, pagination, columnVisibility...)
 * - pageSizeOptions: array of numbers for page size select
 * - enableSorting: boolean
 * - enablePagination: boolean
 * - enableGlobalFilter: boolean
 * - className: extra wrapper classes
 * - rowKey: string property to use as key (default 'id')
 * - renderToolbar: optional render function for custom toolbar (receives table instance)
 */

export default function ReusableTable({
  columns,
  data,
  initialState = {},
  pageSizeOptions = [10, 20, 50],
  enableSorting = true,
  enablePagination = true,
  enableGlobalFilter = true,
  className = "",
  renderToolbar,
}) {
  const table = useReactTable({
    data: data || [],
    columns,
    state: {},
    initialState,
    enableSortingRemoval: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={classNames("w-full overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        {enableGlobalFilter && (
          <div className="flex-1">
            <input
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="w-full max-w-md px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}

        {renderToolbar && renderToolbar(table)}

        {enablePagination && (
          <div className="flex items-center gap-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-2 py-1 border rounded"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded border border-gray-200 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={classNames(
                      "px-4 py-2 text-left text-sm font-medium uppercase tracking-wider select-none",
                      header.column.getCanSort() ? "cursor-pointer" : ""
                    )}
                    onClick={
                      enableSorting && header.column.getToggleSortingHandler()
                    }
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {header.column.getIsSorted() === "asc" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M5 10l5-5 5 5H5z" />
                        </svg>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M5 10l5 5 5-5H5z" />
                        </svg>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-6 text-center text-sm text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {enablePagination && (
        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {">>"}
            </button>

            <span className="ml-3">
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}
              of {table.getPageCount()}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            Showing <strong>{table.getRowModel().rows.length}</strong> rows
          </div>
        </div>
      )}
    </div>
  );
}
