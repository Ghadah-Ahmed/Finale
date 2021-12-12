import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const rows = [
  {
    url: 'https://mui.com/static/images/buttons/burgers.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/breakfast.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/camera.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/burgers.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/breakfast.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/burgers.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/camera.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/burgers.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/breakfast.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/burgers.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
  {
    url: 'https://mui.com/static/images/buttons/camera.jpg',
    name: 'Burger',
    description: 'Yummy',
    id: '00',
  },
];

export default function StickyHeadTable() {

  return (
    <Paper sx={{ width: '100%', overflow: 'scroll', height:"100%"}}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell sx={{ width: '100px', padding: '0' }}><img style={{objectFit: 'cover'}} width='100px' src={row.url}/></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description} Burger TO Enhance Your Bla Bla Bla</TableCell>
                    <TableCell>Edit || Delete || View</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}