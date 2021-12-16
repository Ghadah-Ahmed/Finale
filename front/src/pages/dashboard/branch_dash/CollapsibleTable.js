import * as React from 'react';
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
import firebaseDb from "../../../fire";

function Row({ row, id }) {
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
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.time}</TableCell>
        <TableCell align="left"><Button obj={row} id={id} value={row.status}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'rgba(0, 0, 0, 0.04)'}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1}}>
              <Typography variant="h6" gutterBottom component="div">
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {order.name}
                      </TableCell>
                      <TableCell>{order.quantity || 1}</TableCell>
                      <TableCell align="right">{order.price}</TableCell>
                      <TableCell align="right">
                        {Math.round((order.quantity || 1 )* order.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Typography sx={{mt: 5}} variant="h6" gutterBottom component="div">
                Side Note
            </Typography>
              <Table size="small" aria-label="purchases">
              <TableBody>
                    <TableRow >
                      <TableCell>{row.note}</TableCell>    
                    </TableRow>
                </TableBody>
              </Table>           
                  
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable() {

  const [rows, setRows] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    firebaseDb.child('orders').on('value', snapshot => {
        if (snapshot.val() != null)
            // console.log(snapshot.val())
            setRows(snapshot.val())
        else
        console.log({})

    })
  }, [])// similar to componentDidMount


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
           {Object.keys(rows).reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((id, index) => {
                return (
                  <Row  key={index} row={rows[id]} id={id} />
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Object.keys(rows).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{position: 'sticky', bottom: '0', backgroundColor: '#fff' }}
      />
      </Paper>
  );
}
