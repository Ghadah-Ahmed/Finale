import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PreviewIcon from '@mui/icons-material/Preview';

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
                    <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton  aria-label="add an alarm">
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="add to shopping cart">
                        <PreviewIcon />
                      </IconButton>
                  </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}