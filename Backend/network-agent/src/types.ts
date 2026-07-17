export type ConnectionEvent =
    | "NEW_CONNECTION"
    | "STATE_CHANGED"
    | "CONNECTION_CLOSED";

export type ConnectionDirection =
    | "incoming"
    | "outgoing"
    | "unknown";

export interface NetworkEvent {

    /**
     * Unique Connection ID
     */
    id: string;

    /**
     * Scan Number
     */
    scanId: number;

    /**
     * ISO Timestamp
     */
    timestamp: string;

    /**
     * Connection Event
     */
    event: ConnectionEvent;

    /**
     * incoming | outgoing | unknown
     */
    direction: ConnectionDirection;

    /**
     * tcp | udp
     */
    protocol: string;

    /**
     * ESTAB | LISTEN | CLOSE_WAIT ...
     */
    state: string;

    /**
     * Process Name
     */
    process: string;

    /**
     * Process ID
     */
    pid: number | null;

    /**
     * Local Endpoint
     */
    localIP: string;

    localPort: number;

    /**
     * Remote Endpoint
     */
    remoteIP: string;

    remotePort: number;

}