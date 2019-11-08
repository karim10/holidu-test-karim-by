/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Title from "./Title";

import { getSortedTable } from "./helpers";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  tableColumn: {
    width: "18%"
  }
}));

const columnsDetails = [
  {
    label: "Last Name",
    attribute: "last_name",
    attributeType: "string"
  },
  {
    label: "First Name",
    attribute: "first_name",
    attributeType: "string"
  },
  {
    label: "Gender",
    attribute: "gender",
    attributeType: "string"
  },
  {
    label: "City",
    attribute: "city",
    attributeType: "string"
  },
  {
    label: "Country",
    attribute: "country",
    attributeType: "string"
  },
  {
    label: "Score",
    attribute: "score",
    attributeType: "number"
  }
];

function EnhancedHeaderTable(props) {
  const classes = useStyles();
  const { columnsDetails, handleSorting, order, orderBy } = props;
  return (
    <TableHead>
      <TableRow>
        {columnsDetails.map((columnDetails, i) => {
          const alignment = i === columnsDetails.length - 1 ? "right" : "left";
          return (
            <TableCell
              className={classes.tableColumn}
              align={alignment}
              key={columnDetails.attribute}
            >
              <TableSortLabel
                active={orderBy === columnDetails.attribute}
                direction={order}
                onClick={() =>
                  handleSorting(
                    columnDetails.attribute,
                    columnDetails.attributeType
                  )
                }
              >
                {columnDetails.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default function ScoreTable({ peopleData }) {
  const classes = useStyles();
  const [shownRows, setShownRows] = React.useState(10);
  const [order, setOrder] = React.useState(undefined);
  const [orderBy, setOrderBy] = React.useState(undefined);
  const [sortedTable, setSortedTable] = React.useState(peopleData);
  React.useEffect(() => {
    setSortedTable(peopleData.slice(0, shownRows));
  }, [peopleData, shownRows]);

  const handleSeeMore = () => {
    setShownRows(shownRows + 10);
  };
  const handleSorting = (attribute, attributeType) => {
    const newOrder =
      attribute !== orderBy ? order : order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(attribute);
    setSortedTable(
      getSortedTable(peopleData, newOrder, attribute, attributeType)
    );
  };
  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <Table size="small">
        <EnhancedHeaderTable
          columnsDetails={columnsDetails}
          handleSorting={handleSorting}
          order={order}
          orderBy={orderBy}
        />
        <TableBody>
          {sortedTable.slice(0, shownRows).map(row => (
            <TableRow key={row.id}>
              <TableCell>
                {row.last_name}
              </TableCell>
              <TableCell>
                {row.first_name}
              </TableCell>
              <TableCell>
                {row.gender}
              </TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>
                {row.country}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={handleSeeMore}>
          See more scores
        </Link>
      </div>
    </React.Fragment>
  );
}
