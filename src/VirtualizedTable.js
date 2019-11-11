import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import clsx from 'clsx';

const useStyles = makeStyles({
    flexContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    tableCell: {
        flex: 1,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
});

export default function VirtualizedTable(props) {
    const classes = useStyles();
    const {
        columns,
        rowHeight,
        headerHeight,
        order: { orderDirection, orderBy },
        handleSorting,
        ...tableProps
    } = props;
    const cellRenderer = ({ cellData, columnIndex }) => {
        const alignment = columnIndex === columns.length - 1 ? 'right' : 'left';
        return (
            <TableCell
                component="div"
                className={classes.tableCell}
                variant="body"
                style={{ height: rowHeight }}
                align={alignment}
            >
                {cellData}
            </TableCell>
        );
    };

    const headerRenderer = ({ label, columnIndex }) => {
        const alignment = columnIndex === columns.length - 1 ? 'right' : 'left';
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer)}
                variant="head"
                style={{ height: headerHeight }}
                align={alignment}
            >
                <TableSortLabel
                    active={orderBy === columns[columnIndex].dataKey}
                    direction={orderDirection}
                    onClick={() => handleSorting(columns[columnIndex])}
                    sortingkey={columns[columnIndex].dataKey}
                >
                    {label}
                </TableSortLabel>
            </TableCell>
        );
    };
    return (
        <AutoSizer>
            {({ height, width }) => (
                <Table
                    height={height}
                    width={width}
                    rowHeight={rowHeight}
                    gridStyle={{
                        direction: 'inherit'
                    }}
                    headerHeight={headerHeight}
                    className={classes.table}
                    {...tableProps}
                    rowClassName={classes.flexContainer}
                >
                    {columns.map(({ dataKey, ...other }, index) => {
                        return (
                            <Column
                                key={dataKey}
                                headerRenderer={headerProps =>
                                    headerRenderer({
                                        ...headerProps,
                                        columnIndex: index
                                    })
                                }
                                className={classes.flexContainer}
                                cellRenderer={cellRenderer}
                                dataKey={dataKey}
                                width={250}
                                {...other}
                            />
                        );
                    })}
                </Table>
            )}
        </AutoSizer>
    );
}

VirtualizedTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            isNumeric: PropTypes.bool
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    order: PropTypes.shape({
        orderDirection: PropTypes.oneOf(['asc', 'desc']),
        orderBy: PropTypes.oneOf(['last_name', 'first_name', 'gender', 'city', 'country', 'score'])
    }),
    handleSorting: PropTypes.func.isRequired
};
