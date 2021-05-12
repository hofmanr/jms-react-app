import React, { useEffect } from 'react';
import useStyles from '../Styles';
import { ClassNameMap } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Info from '../components/Info';
import { Queue, Record } from '../common/types';
import { fetchQueues, fetchRecords, postPayload, removeRecord } from '../services/dbServices';
import SelectQueue from '../components/SelectQueue';
import QueueContent from '../components/content/QueueContent';

function QueuePg() {
    const classes: ClassNameMap = useStyles();
    // State
    const [queues, setQueues] = React.useState<Queue[]>([]);
    const [queue, setQueue] = React.useState<Queue>(); // current selected queue
    const [records, setRecords] = React.useState<Record[]>([]); // records in the selected queue

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


    // Make sure the records are sequential processed (else you get DB errors from json-server)
    async function executeDelete(records: (Record | undefined)[]): Promise<string[]> {
        const errors: string[] = []; 
        for (const rec of records) {
            try {
                // wait for item to be processed or failed with error
                await removeRecord(queue!, rec!);
            } catch (error) {
                // one of param handlers failed with 'error'
                errors.push(error);
            }
        }
        return errors;
    };

    const handleDeleteRecords = (ids: number[]) => {
        let recordsToDelete: (Record | undefined)[] = ids.map((id: number) => records.find((value: Record) => value.id === id));
        let promiss = executeDelete(recordsToDelete);
        // Refresh the content in the QueueContent component
        promiss.then((value: string[]) => handleRefreshContent());
    };

    const handleRefreshContent = () => {
        if (queue) {
            fetchRecords(queue).then(rs => setRecords(rs));
        } else {
            setRecords([]);
        }
    };

    const handleRefreshQueues = () => {
        console.log('Refresh queues');
        fetchQueues().then(qs => {
            // Reset state
            setQueues(qs);
            setQueue(undefined);
            setRecords([]);
        });
    };

    return (
        <main>
            <div className={classes.container}>
                <Container maxWidth="sm">
                    <Info title="Queue Details" message="Show, add and delete messages from queues." />
                    <SelectQueue queues={queues} onRefresh={handleRefreshQueues} onSelectQueue={onSelectQueue} />
                </Container>
            </div>
            <div className={classes.container}>
                <Container maxWidth="md">
                    <QueueContent queue={queue} records={records} onRefresh={handleRefreshContent} onAddRecord={handleAddRecord} onDeleteRecords={handleDeleteRecords} />
                </Container>
            </div>
        </main>
    );

}

export default QueuePg;