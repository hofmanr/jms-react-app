import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from '../Styles';
import { Record } from '../common/types';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface QueueContentProps {
    records: Record[];
} 

function QueueContentV1({ records }: QueueContentProps) {
    const classes = useStyles();

    console.log('QueueContent', records); // can be undefined

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Select</TableCell>
                        <TableCell>Message ID</TableCell>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Payload</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell component="th" scope="row">select</TableCell>
                            <TableCell>{record.messageID}</TableCell>
                            <TableCell>{record.timestamp}</TableCell>
                            <TableCell>payload</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

export default QueueContentV1;