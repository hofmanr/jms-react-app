import React, { useEffect } from 'react';
import useStyles from '../Styles';
import { ClassNameMap } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Info from '../components/Info';
import { Queue, Record } from '../common/types';
import { fetchQueues, fetchRecords, postPayload } from '../services/dbServices';
import SelectQueue from '../components/SelectQueue';
import QueueContent from '../components/content/QueueContent';

function QueuePg() {
    const classes: ClassNameMap = useStyles();
    // State
    const [queues, setQueues] = React.useState<Queue[]>([]);
    const [records, setRecords] = React.useState<Record[]>([]);
    const [queue, setQueue] = React.useState<Queue>(); // current selected queue
    // run when first load the component in the browser
    useEffect(() => {
        console.log('Fetch queues');
        fetchQueues().then(qs => setQueues(qs));
    }, []); // run it once

    const onSelectQueue = (seletedQueue: Queue) => {
        setQueue(seletedQueue);
        if (seletedQueue) {
            fetchRecords(seletedQueue).then(rs => setRecords(rs));
        } else {
            setRecords([]);
        }
    };

    const handleAddRecord = (payload: string) => {
        console.log('post new record to queue', queue, payload);
        postPayload(queue!, payload);
    };

    const handleDeleteRecords = (ids: number[]) => {
        console.log(`delete records from queue ${queue?.name}`, ids);
    }

    return (
        <main>
            <div className={classes.container}>
                <Container maxWidth="sm">
                    <Info title="Queue Details" message="Show, add and delete messages from queues." />
                    <SelectQueue queues={queues} onSelectQueue={onSelectQueue} />
                </Container>
            </div>
            <div className={classes.container}>
                <Container maxWidth="md">
                    <QueueContent queue={queue} records={records} onAddRecord={handleAddRecord} onDeleteRecords={handleDeleteRecords} />
                </Container>
            </div>
        </main>
    );

}

export default QueuePg;