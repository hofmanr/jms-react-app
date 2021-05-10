
export interface Queue {
    id: number;
    name: string;
}

export interface Record {
    id: number;
    queue: number;
    messageID: string;
    timestamp: Date;
}

export interface Payload {
    id: number;
    queue: number;
    record: number;
    payload: string;
}
