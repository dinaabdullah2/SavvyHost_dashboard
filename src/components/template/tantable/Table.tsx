import type { ColumnDef } from '@tanstack/react-table';
import { FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    showNavigation?: boolean;
    showGlobalFilter?: boolean;
    filterFn?: FilterFn<T>;
}




export const Table = <T extends object>({ data, columns, showNavigation }: ReactTableProps<T>) => {
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true, //enable row selection for all rows

        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="  overflow-x-scroll  GlobalTable w-full flex flex-col gap-4">
                <table className="min-w-full text-center">
                    <thead className="border-b  bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <tr key={headerGroup.id}>
                                <td className="w-[50px]">{/* <input value={headerGroup.id} type="checkbox" />{' '} */}</td>
                                {headerGroup.headers.map((header: any) => (
                                    <th key={header.id} className="px-6 py-4 text-sm font-medium text-white">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row: any) => (
                            <tr key={row.id} className='border-b" bg-white'>
                                <td>{/* <input value={row.id} type="checkbox" />{' '} */}</td>
                                {row.getVisibleCells().map((cell: any) => (
                                    <>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    </>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showNavigation ? (
                    <div className="flex items-center gap-2 m-auto flex-col md:flex-row pb-5">
                        <div className="pagination-table">
                            <button className="border rounded-full p-1" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                                <MdKeyboardDoubleArrowLeft className="!w-[25px] !h-[25px] text-gray-400" />
                            </button>
                            <button className="bg-primary rounded-full p-2 mr-2" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                <MdKeyboardArrowLeft className="!w-[25px] !h-[25px] text-white" />
                            </button>
                            <button className="bg-primary rounded-full p-2" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                <MdKeyboardArrowRight className="!w-[25px] !h-[25px]  text-white" />
                            </button>
                            <button className="border rounded-full p-1" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                                <MdKeyboardDoubleArrowRight className="!w-[25px] !h-[25px] text-gray-400" />
                            </button>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex items-center gap-1">
                                <div>page</div>
                                <strong>
                                    {table.getState().pagination.pageIndex + 1} from
                                    {table.getPageCount()}
                                </strong>
                            </span>
                            <span className="flex items-center gap-1">
                                go to page:
                                <input
                                    type="number"
                                    defaultValue={table.getState().pagination.pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        table.setPageIndex(page);
                                    }}
                                    className="border p-1 rounded w-16"
                                />
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};
