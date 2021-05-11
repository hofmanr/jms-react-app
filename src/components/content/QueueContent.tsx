import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AlertDialog from '../../components/AlertDialog';
import PayloadDialog from '../../components/PayloadDialog';

import useStyles from '../../Styles';
import { Queue, Record, Payload } from '../../common/types';
import { Order, getComparator, stableSort } from './tableUtils';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import { fetchPayload} from '../../services/dbServices';


interface QueueContentProps {
    queue: Queue | undefined;
    records: Record[];
    onAddRecord: (payload: string) => void;
    onDeleteRecords: (ids: number[]) => void;
} 

export default function QueueContent({ queue, records, onAddRecord, onDeleteRecords }: QueueContentProps) {
  const classes = useStyles();

  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Record>('timestamp');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [payload, setPayload] = React.useState<Payload>(); // for showing the payload in dialog
  const [dialogOpen, setDialogOpen] = React.useState(false); // payload dialog
  const [dialogEditMode, setDialogEditMode] = React.useState(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Record) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage);

  const deleteRecords = () => onDeleteRecords(selected); // Action when pressed OK
  const handleDelete = () => setAlertDialogOpen(true); // show dialogbox
  
  const handleAddRecord = () => {
      setPayload({id: 0, queue: 0, record: 0, payload: ""});
      setDialogEditMode(true);
      setDialogOpen(true);
  };

  const showPayload = (record : Record) => {
    if (queue) {
      fetchPayload(queue!, record).then(pl => {
        setPayload(pl);
        setDialogEditMode(false);
        setDialogOpen(true);
      });
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onAddRecord={handleAddRecord}
          onDelete={handleDelete}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={records.length}
            />
            <TableBody>
              {stableSort(records, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record, index) => {
                  const isItemSelected = isSelected(record.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={record.id}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" onClick={(event) => handleClick(event, record.id)}>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" onClick={(event) => handleClick(event, record.id)}>
                        {record.messageID}
                      </TableCell>
                      <TableCell padding="none" onClick={(event) => handleClick(event, record.id)}>
                        {record.timestamp}
                        </TableCell>
                      <TableCell>
                        <Tooltip title="Payload">
                          <IconButton size="small" aria-label="payload" onClick={() => { showPayload(record)}}>
                            <DescriptionOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (41 * emptyRows) }}> {/* small: 33 medium: 53 */}
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <AlertDialog 
        title="Delete selected record(s)?" 
        message="You cannot undo this operation." 
        open={alertDialogOpen}
        setOpen={setAlertDialogOpen}
        action={deleteRecords}
      />
       <PayloadDialog 
        title={dialogEditMode ? "Submit New Payload" : "Show Payload"} 
        payload={payload?.payload}
        open={dialogOpen}
        editMode={dialogEditMode}
        setOpen={setDialogOpen}
        action={onAddRecord}
      />     
    </div>
  );
}