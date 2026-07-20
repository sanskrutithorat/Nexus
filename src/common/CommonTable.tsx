import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./CommonTable.module.scss";

type CommonTableProps<T> = {
    data: T[];
    columns: ColumnDef<T, any>[];
    showPagination?: boolean;
    pageSize?: number;
    itemName?: string;
};

const CommonTable = <T,>({
    data,
    columns,
    showPagination = true,
    pageSize = 10,
    itemName = "items"
}: CommonTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        ...(showPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    const pagination = table.getState().pagination;
    const firstItemIndex = data.length > 0 ? pagination.pageIndex * pagination.pageSize + 1 : 0;
    const lastItemIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
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
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPagination && (
                <div className={styles.paginationFooter}>
                    <div className={styles.paginationInfo}>
                        Showing {firstItemIndex} to {lastItemIndex} of {data.length} {itemName} ({pagination.pageSize} items per page)
                    </div>

                    <div className={styles.paginationControls}>
                        <span className={styles.pageText}>
                            Page {pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
                        </span>

                        <button
                            className={styles.paginationBtn}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ArrowLeft size={16} />
                            Previous
                        </button>

                        <button
                            className={styles.paginationBtn}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CommonTable;
