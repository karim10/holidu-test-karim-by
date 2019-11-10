import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { AutoSizer, Column, Table } from "react-virtualized";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center"
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined
    }
  },
  tableCell: {
    flex: 1
  }
});

function MuiVirtualizedTable(props) {
  const {
    columns,
    classes,
    rowHeight,
    headerHeight,
    order,
    orderBy,
    handleSorting,
    ...tableProps
  } = props;
  const cellRenderer = ({ cellData, columnIndex }) => {
    const alignment = columnIndex === columns.length - 1 ? "right" : "left";
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
    const alignment = columnIndex === columns.length - 1 ? "right" : "left";
    return (
      <TableCell
        component="div"
        className={classes.tableCell}
        variant="head"
        style={{ height: headerHeight }}
        align={alignment}
      >
        <TableSortLabel
          active={orderBy === columns[columnIndex].dataKey}
          direction={order}
          onClick={() => handleSorting(columns[columnIndex])}
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
            direction: "inherit"
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



export const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

VirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.oneOf([
    "last_name",
    "first_name",
    "gender",
    "city",
    "country",
    "score"
  ]),
  handleSorting: PropTypes.func.isRequired
};
