"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Files } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export type transactions = {
  id: string;
  amount: number;
  timeStamp: Date;
  fromUser: {
    email: string;
  };
  toUser: {
    email: string;
  };
};

type PropTypes = {
  className: string;
  userMail: string;
  transactions: transactions[];
};

export function TransactionHistory({
  className,
  userMail,
  transactions: data,
}: PropTypes) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<transactions>[] = [
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
      header: "Transaction Id",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },

    {
      accessorKey: "fromUser",
      header: ({ column }) => {
        return (
          <div
            className="text-left flex gap-2 items-center hover:cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sender
            <ArrowUpDown size={15} />
          </div>
        );
      },
      cell: ({ row }) => {
        const fromUser = row.getValue("fromUser") as { email: string };
        return <div className="lowercase">{fromUser?.email}</div>;
      },
    },
    {
      accessorKey: "toUser",
      header: ({ column }) => {
        return (
          <div
            // variant="ghost"
            className="text-left flex gap-2 items-center hover:cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Receiver
            <ArrowUpDown size={15} />
          </div>
        );
      },
      cell: ({ row }) => {
        const toUser = row.getValue("toUser") as { email: string };
        return <div className="lowercase">{toUser?.email}</div>;
      },
    },
    {
      accessorKey: "timeStamp",
      header: () => <div>Time</div>,
      cell: ({ row }) => {
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        } as const;
        const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
          row.getValue("timeStamp")
        );
        // const date = row.getValue("timeStamp");
        return <div>{formattedDate}</div>;
      },
    },

    {
      accessorKey: "amount",
      header: () => <div className="text-left">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const fromUser = row.getValue("toUser") as { email: string };
        const isAmountReceived = fromUser?.email === userMail;
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount / 100);

        return (
          <div className="flex items-center justify-start gap-2 font-medium">
            {isAmountReceived ? "+" : "-"} {formatted}
          </div>
        );
      },
    },

    {
      accessorKey: "id",
      header: () => <div className="">Trnx Id</div>,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div
            onClick={() => {
              toast.success("Copied transaction Id");
              navigator.clipboard.writeText(payment.id);
            }}
            // variant="ghost"
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <Files size={18} />
          </div>
        );
      },
    },
  ];

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={`${className} w-full`}>
      <Toaster />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
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
  );
}
