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

async function fetchPayload(queue: Queue, record: Record) {
    return await fetch(`http://localhost:8000/payload?queue=${queue.id}&record=${record.id >= 40 ? record.id : 1}`)
    .then((res: Response) => res.json())
    .then((data: Payload[]) => (data.length > 0) ? data[0] : { id: 1, queue: 1, record: 1, payload: ""});
}

async function postPayload(queue: Queue, payload: string) {
    fetch('http://localhost:8000/records?',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({queue: `${queue.id}`, messageID: 'ID:123', timestamp: "2021-04-11T23:09:34.047"})
    })
    .then((res: Response) => res.json())
    .then((data: Record) => { 
        console.log(data);
        addPayload(queue, data, payload);
    })
    .catch(function(res){ console.log(res) })
}

async function addPayload(queue: Queue, record: Record, payload: string) {
    fetch('http://localhost:8000/payload?',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({queue: `${queue.id}`, record: `${record.id}`, payload: `${payload}`})
    })
    .then((res: Response) => res.json())
    .then((data: Payload) => console.log(data))
    // .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
}


export { fetchQueues, fetchRecords, fetchPayload, postPayload }