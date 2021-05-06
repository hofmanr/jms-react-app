
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
