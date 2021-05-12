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

async function deleteRecord(record: Record) {
    return await fetch(`http://localhost:8000/records/${record.id}`,
    {
        method: "DELETE"
    })
    .then((res: Response) => null)
    .catch(function(res){ console.log(res) })
}

async function removeRecord(queue: Queue, record: Record) {
    return await fetchPayload(queue, record)
    .then((payload:Payload) => deletePayload(payload))
    .then(() => deleteRecord(record))
    .then(() => "OK")
}

async function fetchPayload(queue: Queue, record: Record) {
    return await fetch(`http://localhost:8000/payload?queue=${queue.id}&record=${record.id >= 40 ? record.id : 1}`)
    .then((res: Response) => res.json())
    .then((data: Payload[]) => (data.length > 0) ? data[0] : { id: 1, queue: 1, record: 1, payload: ""});
}

async function postPayload(queue: Queue, payload: string) {
    return await fetch('http://localhost:8000/records?',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({queue: `${queue.id}`, messageID: 'ID:123', timestamp: "2021-04-11T23:09:34.047"})
    })
    .then((res: Response) => res.json())
    .then((data: Record) => addPayload(queue, data, payload))
    .catch(function(res){ console.log(res) })
}

async function addPayload(queue: Queue, record: Record, payload: string) {
    return await fetch('http://localhost:8000/payload?',
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
    .catch(function(res){ console.log(res) })
}

async function deletePayload(payload: Payload) {
    return await fetch(`http://localhost:8000/payload/${payload.id}`,
    {
        method: "DELETE"
    })
    .then((res: Response) => null)
    .catch(function(res){ console.log(res) })
}

export { fetchQueues, fetchRecords, removeRecord, fetchPayload, postPayload }