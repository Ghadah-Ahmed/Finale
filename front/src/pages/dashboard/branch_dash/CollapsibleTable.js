import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import TablePagination from '@mui/material/TablePagination';
import Button from './Button'

function createData(table, orderId, date, time, status, orders) {
  return {
    table,
    orderId,
    date,
    time,
    status,
    orders: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowDropUpRoundedIcon/> : <ArrowDropDownRoundedIcon/> }
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.table}</TableCell>
        <TableCell align="left">{row.orderId}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.time}</TableCell>
        <TableCell align="left"><Button value='Active'/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.status * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 26256547853489534783658842906794398048508,'2020-01-05', 24, 4.0, 3.99),
  createData('Ice cream sandwich', 26256547853489534783658842906794398048508,'2020-01-05', 37, 4.3, 4.99),
  createData('Eclair', 26256547853489534783658842906794398048508, '2020-01-05', 24, 6.0, 3.79),
  createData('Cupcake', 26256547853489534783658842906794398048508,'2020-01-05', 67, 4.3, 2.5),
  createData('Gingerbread', 26256547853489534783658842906794398048508, '2020-01-05', 49, 3.9, 1.5),
  createData('Frozen yoghurt', 26256547853489534783658842906794398048508, '2020-01-05', 24, 4.0, 3.99),
  createData('Ice cream sandwich', 26256547853489534783658842906794398048508,'2020-01-05', 37, 4.3, 4.99),
  createData('Eclair', 26256547853489534783658842906794398048508, '2020-01-05', 24, 6.0, 3.79),
  createData('Cupcake', 26256547853489534783658842906794398048508,'2020-01-05', 67, 4.3, 2.5),
  createData('Gingerbread', 26256547853489534783658842906794398048508, '2020-01-05', 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%' }}>
      <Table aria-label="collapsible table">
      <TableHead sx={{position: 'sticky', top: '0', backgroundColor: '#ededed', zIndex: '99' }}>
          <TableRow>
            <TableCell />
            <TableCell >Table / Name</TableCell>
            <TableCell  align="left">Order Id</TableCell>
            <TableCell  align="left">Date</TableCell>
            <TableCell  align="left">Time</TableCell>
            <TableCell  align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
           {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Row key={row.orderId} row={row} />
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{position: 'sticky', bottom: '0', backgroundColor: '#fff' }}
      />
      </Paper>
  );
}
