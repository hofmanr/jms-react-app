import { Queue, Record } from '../common/types';

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

export { fetchQueues, fetchRecords }