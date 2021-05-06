import React, { useEffect } from 'react';
import useStyles from '../Styles';
import { ClassNameMap } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Info from '../components/Info';
import { Queue, Record } from '../common/types';
import { fetchQueues, fetchRecords } from '../services/dbServices';
import SelectQueue from '../components/SelectQueue';
import QueueContent from '../components/content/QueueContent';

function QueuePg() {
    const classes: ClassNameMap = useStyles();
    // State
    const [queues, setQueues] = React.useState<Queue[]>([]);
    const [records, setRecords] = React.useState<Record[]>([]);
    // run when first load the component in the browser
    useEffect(() => {
        console.log('Fetch queues');
        fetchQueues().then(qs => setQueues(qs));
    }, []); // run it once

    const setSelectedQueue = (queue: Queue) => {
        console.log('Queue Page Set Queue');
        if (queue) {
            fetchRecords(queue).then(rs => setRecords(rs));
        } else {
            setRecords([]);
        }
    };

    return (
        <main>
            <div className={classes.container}>
                <Container maxWidth="sm">
                    <Info title="Queue Details" message="Show, add and delete messages from queues." />
                    <SelectQueue queues={queues} selectedQueue={setSelectedQueue} />
                </Container>
            </div>
            <div className={classes.container}>
                <Container maxWidth="md">
                    <QueueContent records={records} />
                </Container>
            </div>
        </main>
    );

}

export default QueuePg;