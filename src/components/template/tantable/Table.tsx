import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, FilterFn, getFilteredRowModel } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../atoms';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    showNavigation?: boolean;
    showGlobalFilter?: boolean;
    filterFn?: FilterFn<T>;
}

export const Table = <T extends object>({ data, columns, showNavigation }: ReactTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="overflow-hidden GlobalTable w-full flex flex-col gap-4">
                <table className="min-w-full text-center">
                    <thead className="border-b bg-mainGreen">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-6 py-4 text-sm font-medium text-white">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='border-b" bg-white'>
                                {row.getVisibleCells().map((cell) => (
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showNavigation ? (
                    <div className="flex items-center gap-2 m-auto flex-col md:flex-row">
                        <div className="pagination-table">
                            <button className="border rounded-full p-1" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                                <MdKeyboardDoubleArrowLeft className="!w-[25px] !h-[25px]" />
                            </button>
                            <button className=" rounded-full p-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                <BsFillArrowLeftCircleFill className="!w-[25px] !h-[25px] text-mainGreen" />
                            </button>
                            <button className=" rounded-full p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                <BsFillArrowRightCircleFill className="!w-[25px] !h-[25px] text-mainGreen" />
                            </button>
                            <button className="border rounded-full p-1" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                                <MdKeyboardDoubleArrowRight className="!w-[25px] !h-[25px]" />
                            </button>
                        </div>

                        <div className="flex gap-1">
                            <span className="flex items-center gap-1">
                                <div>صفحة</div>
                                <strong>
                                    {table.getState().pagination.pageIndex + 1} من
                                    {table.getPageCount()}
                                </strong>
                            </span>
                            <span className="flex items-center gap-1">
                                الذهاب لصفحة:
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
