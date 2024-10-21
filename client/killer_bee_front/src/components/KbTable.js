import {
    Fragment,
    useRef,
    useState,
    useLayoutEffect,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import {
    HorizontalRule,
    KeyboardArrowUp,
    KeyboardArrowDown,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@mui/icons-material';

import PropTypes from 'prop-types';
import { Button, MenuItem, TextField } from '@mui/material';

const cellStyle = classNames(
    'py-4 pl-4 pr-3 text-sm lg:pl-6',
    'first:rounded-l-lg last:rounded-r-lg'
);


const KbTable = forwardRef(
    (
        {
            filters = {},
            columns = [],
            defaultSorting = {
                column: '',
                direction: '',
            },
            paginationServer = false,
            showLoading = true,
            fetchData,
            actions
        },
        ref
    ) => {

        const pageSizeOption = [
            /*{
            label: "1 rows",
            value: 1
        },*/
            {
                label: '10 ' + "rows",
                value: 10,
            },
            {
                label: '20 ' + "rows",
                value: 20,
            },
            {
                label: '50 ' + "rows",
                value: 50,
            },
        ];

        useImperativeHandle(ref, () => ({
            resetSelection: () => setSelected([]),
        }));

        //Data
        const [allData, setAllData] = useState(null);
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(false);

        //Pagination
        const [pageStartIndex, setPageStartIndex] = useState(0);
        const [pageEndIndex, setPageEndIndex] = useState(0);
        const [pageCount, setPageCount] = useState(0);
        const [rowCount, setRowCount] = useState(0);
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(pageSizeOption[0]);

        const handlePageSize = (item) => {
            setPageSize(item);

            if (paginationServer) {
                refreshData(page, item.value);
                return;
            }

            if (!paginationServer && allData) {
                setPageCount(Math.ceil(allData.length / item.value));
                setRowCount(Math.ceil(allData.length));
                const startIndex = (page - 1) * item.value;
                const endIndex = startIndex + item.value;
                setPageStartIndex(startIndex);
                setPageEndIndex(endIndex);
                setData(allData.slice(startIndex, endIndex));
            }
        };

        function handlePageClick(pageNumber) {
            setPage(pageNumber);

            if (paginationServer) {
                refreshData(pageNumber, pageSize.value);
                return;
            }

            if (!paginationServer && allData) {
                const startIndex = (pageNumber - 1) * pageSize.value;
                const endIndex = startIndex + pageSize.value;
                setPageStartIndex(startIndex);
                setPageEndIndex(endIndex);
                setData(allData.slice(startIndex, endIndex));
            }
        }

        //Sorting
        const [sorting, setSorting] = useState(defaultSorting);

        //Refresh Data
        const refreshData = (page_number = 1, page_size = pageSize.value) => {
            if (loading) return;
            setLoading(true);
            fetchData(
                filters,
                sorting.column,
                sorting.direction,
                paginationServer ? page_number : null,
                paginationServer ? page_size : null
            ).then((response) => {
                if (response.items) {
                    var inData = null;

                    if (Array.isArray(response.items)) {
                        inData = response.items;
                        //console.log(inData)
                    } else {
                        inData = [response.items];
                        //console.log(inData)
                    }

                    if (paginationServer) {
                        setPageCount(response.items.total_pages);
                        setRowCount(response.items.total_rows);
                    } else {
                        setPageCount(Math.ceil(inData.length / page_size));
                        setRowCount(Math.ceil(inData.length));
                    }

                    // determine which page of data should be displayed based on the current page number
                    const startIndex = (page_number - 1) * page_size;
                    const endIndex = startIndex + page_size;
                    setPageStartIndex(startIndex);
                    setPageEndIndex(endIndex);

                    if (paginationServer) {
                        setData(inData);
                    } else {
                        setAllData(inData);
                        setData(inData.slice(startIndex, endIndex));
                    }
                }
                setSelected([]);
                setLoading(false);
            });
        };

        useEffect(() => {
            if (!filters) return;
            setPage(1);
            refreshData();

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [filters, sorting]);

        function handleSort(column, direction) {
            if (loading) return;
            if (!column || !direction) return;
            setSorting({
                column: column,
                direction: direction,
            });
        }

        //Selection
        const [selected, setSelected] = useState([]);

        return (
            <Fragment>
                <div className="relative text-black dark:text-white">
                    <Loading display={showLoading && loading} />

                    <div className="block min-h-[200px]">
                        <table className="min-w-full divide-y divide-gray-300 border-separate border-spacing-y-3">
                            <thead>
                                <tr>
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
                                No record found
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
                                            selected item(s)
                                        </span>
                                        <span>{actions}</span>
                                    </>
                                )}
                            </div>
                            {/* <div dir="ltr">
                                <TextField
                                    select
                                    onChange={handlePageSize}
                                    value={10}
                                    position={'top'}
                                    border="none"
                                >
                                    <MenuItem value={10}>10 rows</MenuItem>
                                    <MenuItem value={20}>20 rows</MenuItem>
                                    <MenuItem value={50}>50 rows</MenuItem>
                                </TextField>
                            </div> */}
                            <div
                                className="flex justify-evenly items-center"
                                dir="ltr"
                            >
                                <Button
                                    disabled={page <= 1 ? true : false}
                                    onClick={() => handlePageClick(page - 1)}
                                    size="small"
                                >
                                    <KeyboardArrowLeft />
                                </Button>
                                <span className="whitespace-nowrap mx-2">
                                    {pageStartIndex}-
                                    {pageEndIndex > rowCount
                                        ? rowCount
                                        : pageEndIndex}{' of '}
                                     {rowCount}{' items'}
                                </span>
                                <Button
                                    disabled={page >= pageCount ? true : false}
                                    onClick={() => handlePageClick(page + 1)}
                                    size="small"
                                >
                                    <KeyboardArrowRight />
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </Fragment>
        );
    }
);

function TableHeader({
    column_id = '',
    scope = '',
    className = '',
    title = '',
    sortable = true,
    currentSorting = {
        column: '',
        direction: '',
    },
    onSortChange,
}) {
    const [showSortButtons, setShowSortButtons] = useState(false);
    const handleMouseEnter = () => {
        setShowSortButtons(true);
    };
    const handleMouseLeave = () => {
        setShowSortButtons(false);
    };

    return (
        <th
            scope={scope}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {scope !== 'actions' && (
                <HorizontalRule className="rotate-90 text-gray-700" />
            )}

            {title}

            {scope !== 'actions' && (
                <span className="ml-2">
                    {
                        /*Ascending Button*/
                        currentSorting &&
                        currentSorting.column === column_id &&
                        currentSorting.direction === 'asc' ? (
                            <KeyboardArrowUp className="cursor-pointer dark:text-gray-600 text-2xl text-gray-400 cursor-default" />
                        ) : (
                            sortable && (
                                <KeyboardArrowUp
                                    className={classNames(
                                        'cursor-pointer dark:text-gray-200 text-2xl text-gray-800 hover:text-primary dark:hover:text-primary cursor-pointer',
                                        showSortButtons ? 'block' : 'invisible'
                                    )}
                                    onClick={() =>
                                        onSortChange(column_id, 'asc')
                                    }
                                />
                            )
                        )
                    }

                    {
                        /*Descending Button*/
                        currentSorting &&
                        currentSorting.column === column_id &&
                        currentSorting.direction === 'desc' ? (
                            <KeyboardArrowDown className="cursor-pointer dark:text-gray-600 text-2xl text-gray-400 cursor-default" />
                        ) : (
                            sortable && (
                                <KeyboardArrowDown
                                    className={classNames(
                                        'cursor-pointer dark:text-gray-200 text-2xl text-gray-800 hover:text-primary dark:hover:text-primary cursor-pointer',
                                        showSortButtons ? 'block' : 'invisible'
                                    )}
                                    onClick={() =>
                                        onSortChange(column_id, 'desc')
                                    }
                                />
                            )
                        )
                    }
                </span>
            )}
        </th>
    );
}

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

KbTable.propTypes = {
    filters: PropTypes.object,
    columns: PropTypes.array,
    defaultSorting: PropTypes.object,
    fetchData: PropTypes.func,
    paginationServer: PropTypes.bool,
    sortingServer: PropTypes.bool,
    onSelectionChange: PropTypes.func,
    actions: PropTypes.node,
    showLoading: PropTypes.bool,
    isDisabled: PropTypes.func,
};
export default KbTable;
