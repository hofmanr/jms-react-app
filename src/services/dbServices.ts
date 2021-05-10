import { Queue, Record, Payload } from '../common/types';

async function fetchQueues() {
    return await fetch('http://localhost:8000/queues')
    .then((res: Response) => res.json())
    .then((data: Queue[]) => data);
}

async function fetchRecords(queue: Queue) {
    return await fetch('http://localhost:8000/records?queue=' + queue?.id)
    .then((res: Response) => res.json())
    .then((data: Record[]) => data);
}

async function fetchPayload(record: number) {
    return await fetch('http://localhost:8000/payload?queue=1&record=1')
    .then((res: Response) => res.json())
    .then((data: Payload[]) => (data.length > 0) ? data[0] : { id: 1, queue: 1, record: 1, payload: ""});
}

export { fetchQueues, fetchRecords, fetchPayload }