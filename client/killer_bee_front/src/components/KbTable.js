import { forwardRef } from "react";
import {
    HorizontalRule,
    KeyboardArrowUp,
    KeyboardArrowDown,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@mui/icons-material';

const KbTable = forwardRef(({
    filters = {},
    columns = [],
    defaultSorting = {
        column: '',
        direction: '',
    },
    showLoading = true,
    fetchData,
    actions
    
}, ref)=>{
    const [loading, setLoading] = useState(false);
    return(
        <>
         <div className="relative text-black dark:text-white">
                    <Loading display={showLoading && loading} />

                    <div className="block min-h-[200px]">
                        <table className="min-w-full divide-y divide-gray-300 border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    {selection && (
                                        <th
                                            scope="col"
                                            className="relative w-12 px-4 xl:w-16 2xl:px-8"
                                        >
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6"
                                                ref={checkbox}
                                                checked={checked}
                                                onChange={toggleAll}
                                                title={selectionHoverText}
                                            />
                                        </th>
                                    )}
                                    {columns.map((column) => (
                                        <TableHeader
                                            key={column.field}
                                            column_id={column.field}
                                            scope={
                                                column.type !== 'actions'
                                                    ? 'col'
                                                    : 'actions'
                                            }
                                            className={classNames(
                                                'py-3.5 pl-4 first:pl-0 pr-3 text-left rtl:text-right text-sm font-semibold',
                                                'whitespace-nowrap',
                                                column.desktop === false
                                                    ? 'hidden'
                                                    : ''
                                            )}
                                            title={column.label}
                                            sortable={column.sortable}
                                            currentSorting={sorting}
                                            onSortChange={handleSort}
                                        />
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {(!data || data.length <= 0) &&
                                    (!activeData ||
                                        (activeData.length <= 0 && (
                                            <tr className="bg-black/[.05] dark:bg-white/[.03] hover:bg-[#149ad1]/[.24] hover:dark:bg-[#149ad1]/[.24]">
                                                <td
                                                    className={
                                                        cellStyle +
                                                        ' text-center'
                                                    }
                                                    colSpan={columns.length}
                                                >
                                                    {t('fields.nothing', {
                                                        ns: 'home',
                                                    })}
                                                </td>
                                            </tr>
                                        )))}
                                {data &&
                                    data.map((row, index) => (
                                        <tr
                                            key={row.key}
                                            className={classNames(
                                                selected.includes(row)
                                                    ? 'bg-[#149ad1]/[.24]'
                                                    : 'bg-black/[.05] dark:bg-white/[.03] ',
                                                'hover:bg-[#149ad1]/[.24] hover:dark:bg-[#149ad1]/[.24]'
                                            )}
                                        >
                                            {selection && (
                                                <td
                                                    className={classNames(
                                                        'whitespace-nowrap',
                                                        'py-4 pl-4 pr-3 text-sm 2xl:pl-6 first:rounded-l-lg last:rounded-r-lg relative w-12'
                                                    )}
                                                >
                                                    {!isRowDisabled(row) && (
                                                        <input
                                                            type="checkbox"
                                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6"
                                                            value={row.key}
                                                            checked={selected.includes(
                                                                row
                                                            )}
                                                            onChange={(e) =>
                                                                setSelected(
                                                                    e.target
                                                                        .checked
                                                                        ? [
                                                                              ...selected,
                                                                              row,
                                                                          ]
                                                                        : selected.filter(
                                                                              (
                                                                                  r
                                                                              ) =>
                                                                                  r !==
                                                                                  row
                                                                          )
                                                                )
                                                            }
                                                            title={
                                                                selectionHoverText
                                                            }
                                                        />
                                                    )}
                                                </td>
                                            )}
                                            {columns.map((column) => (
                                                <td
                                                    key={
                                                        row.key +
                                                        '.' +
                                                        column.field
                                                    }
                                                    className={classNames(
                                                        cellStyle,
                                                        column.break_word &&
                                                            column.break_word
                                                            ? ''
                                                            : 'whitespace-nowrap',
                                                        column.desktop === false
                                                            ? 'hidden'
                                                            : ''
                                                    )}
                                                >
                                                    {column.renderCell &&
                                                        column.renderCell(row)}
                                                    {!column.renderCell &&
                                                        row[column.field]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* use a card view for small screens */}
                    <div className="hidden min-h-[100px]">
                        {(!data || data.length <= 0) && (
                            <div
                                className={classNames(
                                    'bg-black/[.05] dark:bg-white/[.03] ',
                                    'hover:bg-[#149ad1]/[.24] hover:dark:bg-[#149ad1]/[.24]',
                                    'rounded-lg shadow-lg mb-4 p-4',
                                    'text-center'
                                )}
                            >
                                {t('fields.nothing', {
                                    ns: 'home',
                                })}
                            </div>
                        )}
                        {data &&
                            data.map((row) => (
                                <div
                                    key={row.key}
                                    className={classNames(
                                        selected.includes(row)
                                            ? 'bg-[#149ad1]/[.24]'
                                            : 'bg-black/[.05] dark:bg-white/[.03] ',
                                        'hover:bg-[#149ad1]/[.24] hover:dark:bg-[#149ad1]/[.24]',
                                        'rounded-lg shadow-lg mb-4 p-4'
                                    )}
                                    onClick={(e) => {
                                        setSelected(
                                            selected.includes(row)
                                                ? [...selected, row]
                                                : selected.filter(
                                                      (r) => r !== row
                                                  )
                                        );
                                    }}
                                >
                                    <div>
                                        {columns.map(
                                            (column) =>
                                                column.mobile && (
                                                    <div
                                                        key={column.field}
                                                        className="flex justify-between"
                                                    >
                                                        {column.renderCell &&
                                                            column.renderCell(
                                                                row
                                                            )}
                                                        {!column.renderCell && (
                                                            <div>
                                                                <div className="text-gray-700 font-bold mb-1">
                                                                    {
                                                                        column.label
                                                                    }
                                                                    :
                                                                </div>
                                                                <div className="text-gray-800">
                                                                    {
                                                                        row[
                                                                            column
                                                                                .field
                                                                        ]
                                                                    }
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* render the pagination buttons */}
                    {
                        <div className="mt-4 flex items-center justify-end text-xs border-t-[0.5px] border-[#e5e7eb]/[.2]">
                            <div className="hidden lg:block grow text-base pl-4 mt-2 h-10">
                                {selected && selected.length > 0 && (
                                    <>
                                        <span className="mr-4">
                                            {selected.length}{' '}
                                            {t(
                                                'table.selection.selected_items'
                                            )}
                                        </span>
                                        <span>{actions}</span>
                                    </>
                                )}
                            </div>
                            <div dir="ltr">
                                <PrySelect
                                    onChange={handlePageSize}
                                    data={pageSizeOption}
                                    value={10}
                                    position={'top'}
                                    border="none"
                                ></PrySelect>
                            </div>
                            <div
                                className="flex justify-evenly items-center"
                                dir="ltr"
                            >
                                <Button
                                    border={false}
                                    processing={page <= 1}
                                    onClick={() => handlePageClick(page - 1)}
                                    size="small"
                                >
                                    <KeyboardArrowLeft />
                                </Button>
                                <span className="whitespace-nowrap mx-2">
                                    {pageStartIndex}-
                                    {pageEndIndex > rowCount
                                        ? rowCount
                                        : pageEndIndex}{' '}
                                    {t('table.pagination.of')} {rowCount}{' '}
                                    {t('table.pagination.items')}
                                </span>
                                <Button
                                    border={false}
                                    processing={page >= pageCount}
                                    onClick={() => handlePageClick(page + 1)}
                                    size="small"
                                >
                                    <KeyboardArrowRight />
                                </Button>
                            </div>
                        </div>
                    }
                </div>
        </>
    )
})

function Loading({ display = false }) {
    return (
        <Fragment>
            {display && (
                <div
                    role="status"
                    className="absolute w-full h-full z-10 rounded-lg flex justify-center items-center"
                >
                    <div className="flex items-center flex-col gap-2">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#2db4eb]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <div>Loading...</div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
export default KbTable