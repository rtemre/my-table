"use client";

// Import necessary dependencies
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  Table as ReactTableInstance,
  flexRender,
} from "@tanstack/react-table";

// Define the props type
interface TableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
}

// Define the Table component
const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  // Create the table instance
  const table: ReactTableInstance<T> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div>
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => table.setGlobalFilter(e.target.value || undefined)}
        className="search-input"
      />

      {/* Render Table */}
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div>
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                          style: {
                            cursor: header.column.getCanSort()
                              ? "pointer"
                              : "default",
                          },
                        }}
                      >
                        {/* {header.renderHeader()} */}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span>
                            {header.column.getIsSorted() === "asc"
                              ? " 🔼"
                              : header.column.getIsSorted() === "desc"
                              ? " 🔽"
                              : ""}
                          </span>
                        )}
                      </div>
                      {/* Column Filter: A filter input field beneath its header if filtering is enabled for that column */}
                      {header.column.getCanFilter() && (
                        <input
                          type="text"
                          placeholder={`Filter ${header.column.id}`}
                          value={
                            (header.column.getFilterValue() as string) || ""
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          className="column-filter-input"
                        />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                // <td key={cell.id}>{cell.renderCell()}</td>
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>

      {/* Aggregation Example */}
      <div className="aggregation">
        <p>Total Rows: {table.getPrePaginationRowModel().rows.length}</p>
      </div>
    </div>
  );
};

export default Table;
