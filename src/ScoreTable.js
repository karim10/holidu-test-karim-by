/* eslint-disable no-script-url */

import React from "react";
import { VirtualizedTable } from "./MuiVirtualizedTable";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Title from "./Title";
import { getSortedTable, getFilteredTable } from "./helpers";

const columnsDetails = [
  {
    label: "Last Name",
    dataKey: "last_name"
  },
  {
    label: "First Name",
    dataKey: "first_name"
  },
  {
    label: "Gender",
    dataKey: "gender"
  },
  {
    label: "City",
    dataKey: "city"
  },
  {
    label: "Country",
    dataKey: "country"
  },
  {
    label: "Score",
    dataKey: "score",
    numeric: true
  }
];
export default function ScoreTable({ peopleData }) {
  const [order, setOrder] = React.useState({
    orderDirection: undefined,
    orderBy: "asc",
    isNumeric: false
  });
  const [tableData, setTableData] = React.useState(peopleData);
  React.useEffect(() => {
    setTableData(peopleData);
  }, [peopleData]);

  const handleSorting = columnDetails => {
    const { dataKey, numeric } = columnDetails;
    const newOrderDirection =
      dataKey !== order.orderBy
        ? order.orderDirection
        : order.orderDirection === "asc"
        ? "desc"
        : "asc";
    setOrder({
      orderDirection: newOrderDirection,
      orderBy: dataKey,
      isNumeric: numeric
    });
    setTableData(
      getSortedTable(tableData, newOrderDirection, dataKey, numeric)
    );
  };

  const handleSearch = e => {
    const queryInput = e.target.value;
    let data = peopleData;
    if (order.orderBy !== undefined) {
      data = getSortedTable(
        peopleData,
        order.orderDirection,
        order.orderBy,
        order.isNumeric
      );
    }
    setTableData(getFilteredTable(data, queryInput));
  };

  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <TextField
        label="Search..."
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={handleSearch}
      />
      <Paper style={{ height: 400 }}>
        <VirtualizedTable
          rowCount={tableData.length}
          rowGetter={({ index }) => tableData[index]}
          columns={columnsDetails}
          order={order}
          handleSorting={handleSorting}
          headerHeight={48}
          rowHeight={48}
        />
      </Paper>
    </React.Fragment>
  );
}
