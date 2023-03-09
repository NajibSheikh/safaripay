import * as React from "react";
import { useState, useEffect } from "react";
import { generateRequestId } from "../Services";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import config from "../config/config";

const columns = [
  { id: "partnerId", label: "Partner Id", minWidth: 100 },
  { id: "partnerName", label: "Partner Name", minWidth: 100 },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NumberOfBills",
    label: "Number Of Bills",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NumberOfPaidBills",
    label: "Number Of Paid Bills",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "NumberOfUnpaidBills",
    label: "Number Of Unpaid Bills",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    // Fetch data from server here

    const getTransactions = async () => {
      try {
        const transactionsRequest = {
          requestBody: {
            sessionId: sessionStorage.getItem("sessionId"),
            permissionId: "2",
            serviceName: "getAllTransactions",
          },
          requestHeader: {
            schemaVersion: "1.0",
            requestId: generateRequestId(),
            timestamp: Date.now(),
          },
        };

        const response = await axios.post(
          config.billingServer + "/adminservices/getAllTransactions",
          transactionsRequest
        );

        const { statusMessage, bills, statusCode } = response.data.responseBody;
        console.log("Response.responseBody: ", response.data.responseBody);

        if (statusMessage === "SUCCESS") {
          console.log("bills" + JSON.stringify(bills));
          setData(bills);
        } else if (statusCode === "1300") {
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTransactions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.partnerId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
