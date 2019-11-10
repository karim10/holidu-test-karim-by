/* eslint-disable no-script-url */

import React from "react";
import { VirtualizedTable } from "./MuiVirtualizedTable";
import Paper from "@material-ui/core/Paper";

import Title from "./Title";
import { getSortedTable } from "./helpers";

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
  const [order, setOrder] = React.useState(undefined);
  const [orderBy, setOrderBy] = React.useState(undefined);
  const [sortedTable, setSortedTable] = React.useState(peopleData);
  React.useEffect(() => {
    setSortedTable(peopleData);
  }, [peopleData]);

  const handleSorting = columnDetails => {
    const { dataKey, numeric } = columnDetails;
    const newOrder =
      dataKey !== orderBy ? order : order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(dataKey);
    setSortedTable(getSortedTable(peopleData, newOrder, dataKey, numeric));
  };

  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <Paper style={{ height: 400 }}>
        <VirtualizedTable
          rowCount={sortedTable.length}
          rowGetter={({ index }) => sortedTable[index]}
          columns={columnsDetails}
          order={order}
          orderBy={orderBy}
          handleSorting={handleSorting}
          headerHeight={48}
          rowHeight={48}
        />
      </Paper>
    </React.Fragment>
  );
}
